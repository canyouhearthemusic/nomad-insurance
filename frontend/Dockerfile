FROM node:21.7.2-alpine

WORKDIR /var/www/html

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npm"]