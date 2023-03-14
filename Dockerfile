FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV DB_HOST=172.18.0.2 \
    DB_PORT=3306 \
    DB_USER=root \
    DB_PASSWORD=root \
    DB_NAME=lama \
    APP_PORT=3003 \
    JWT_KEY=adsheigbaxsn \
    JWT_EXPIRES_IN=24h \
    BCRYPT_SALT=12 

EXPOSE 3003

CMD ["npm", "run", "dev"]