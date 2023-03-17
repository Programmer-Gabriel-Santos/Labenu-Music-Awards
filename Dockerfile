FROM node:alpine

WORKDIR /app

ENV DB_HOST=db \
    DB_PORT=3306 \
    DB_USER=root \
    DB_PASSWORD=root \
    DB_NAME=lama \
    APP_PORT=3003 \
    JWT_KEY=adsheigbaxsn \
    JWT_EXPIRES_IN=24h \
    BCRYPT_SALT=12 

COPY package.json /app

COPY build /app/build

RUN npm install --production

EXPOSE 3003

CMD ["npm", "run", "start"]