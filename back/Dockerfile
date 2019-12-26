FROM node:12.12.0-alpine

COPY src/ src/
COPY package.json package.json

RUN npm install
EXPOSE 8080
CMD npm run start
