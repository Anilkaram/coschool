
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/backend ./backend
RUN npm run build
RUN apk add --no-cache python3 make g++
ENV NODE_ENV=production, DB_PATH=/data/coschool.db
EXPOSE 3000
CMD ["npm", "start"]  
# This Dockerfile sets up a Node.js application using the official Node.js 18 Alpine image.