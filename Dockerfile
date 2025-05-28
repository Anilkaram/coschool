FROM node:18-alpine
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000 
CMD ["start","index.html"]
# This Dockerfile sets up a Node.js application using the official Node.js 18 Alpine image.