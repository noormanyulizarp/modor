FROM gitpod/workspace-full

# Install additional tools and libraries
RUN sudo apt-get update && sudo apt-get install -y \
    some-package \
    another-package

# Set up your custom environment
RUN echo "export PATH=$PATH:/path/to/custom/bin" >> ~/.bashrc