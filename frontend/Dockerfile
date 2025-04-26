FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install deps first
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
