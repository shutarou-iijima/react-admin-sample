FROM node:12.12.0-alpine

COPY public/ public/
COPY src/ src/
COPY package.json package.json

RUN npm install
EXPOSE 3000
RUN npm run build
CMD npm run serve
