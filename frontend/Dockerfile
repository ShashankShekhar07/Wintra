FROM node:20-alpine

WORKDIR /app_2

COPY package* .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]