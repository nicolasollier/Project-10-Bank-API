FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install -g nodemon

EXPOSE 3001

CMD [ "npm", "run", "dev:server", "&&", "npm", "run", "populate-db"]
