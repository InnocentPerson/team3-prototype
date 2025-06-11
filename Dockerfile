# Updated Dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
# Fix: Clean cache and update npm before install
RUN npm cache clean --force \
    && npm install -g npm@latest \
    && npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
