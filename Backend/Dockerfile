FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN apk add --no-cache bash curl

EXPOSE 3333

CMD ["npm", "start"]
