FROM node:18-alpine

WORKDIR /app

COPY . .

# install library
RUN npm install

# expose port
EXPOSE 5000

CMD [ "npm", "run", "start:dev" ]