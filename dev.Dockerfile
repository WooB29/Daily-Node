FROM node

WORKDIR /usr/app

COPY package.json .

RUN npm install -g nodemon

COPY . .

CMD ["npm", "start"]