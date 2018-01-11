FROM node:8

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install -g nodemon

EXPOSE 3000

CMD ["npm", "run", "dev"]