FROM node:lts-stretch

WORKDIR /usr/src/app

COPY *.json ./

RUN npm install

COPY . ./

RUN npm run build

COPY ./config ./build/config/

COPY ./views ./build/views

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "run", "nbstart"]