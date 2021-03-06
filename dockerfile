FROM node:10

WORKDIR /usr/src/app

ENV PATH usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./
COPY . .

RUN npm install 
RUN npm install react-scripts@3.0.1 -g 

CMD ["npm", "start"]