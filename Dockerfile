FROM node:alpine

WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:prod"]