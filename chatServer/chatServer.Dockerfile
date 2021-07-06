FROM node:16-alpine

WORKDIR /chatServer

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm","run", "dev"]

