import sqlite3 from 'sqlite3';
import fs from 'fs-extra';

class StateManager {
    private db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database('./state.db');
        this.initDB();
    }

    private initDB() {
        this.db.run(`CREATE TABLE IF NOT EXISTS state
                     (key TEXT PRIMARY KEY, value TEXT)`);
    }

    async saveState(key: string, value: any) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT OR REPLACE INTO state (key, value) VALUES (?, ?)`,
                [key, JSON.stringify(value)], (err) => {
                    if (err) reject(err);
                    else resolve(true);
                });
        });
    }

    async loadState(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT value FROM state WHERE key = ?`, [key], (err, row) => {
                if (err) reject(err);
                else resolve(row ? JSON.parse(row.value) : null);
            });
        });
    }

    async saveFiles(directory: string) {
        await fs.copy(directory, './saved_files');
    }

    async loadFiles(directory: string) {
        await fs.copy('./saved_files', directory);
    }
}

export const stateManager = new StateManager();