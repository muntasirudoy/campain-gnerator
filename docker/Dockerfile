# Development stage
FROM node:22-alpine

WORKDIR /app

# Copy all other files
COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]