import { Storage } from 'megajs';

class CloudStorage {
    private storage: Storage;

    constructor(email: string, password: string) {
        this.storage = new Storage({
            email: email,
            password: password
        });
    }

    async connect() {
        await this.storage.ready;
    }

    async uploadFile(localPath: string, remotePath: string) {
        const file = await this.storage.upload(localPath, remotePath).complete;
        console.log(`File uploaded: ${file.name}`);
    }

    async downloadFile(remotePath: string, localPath: string) {
        await this.storage.download(remotePath, localPath).complete;
        console.log(`File downloaded to: ${localPath}`);
    }
}

export const cloudStorage = new CloudStorage('your-email@example.com', 'your-password');