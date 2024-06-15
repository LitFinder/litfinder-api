FROM node:18-alpine

WORKDIR /app

COPY . .
COPY auth.json .

# install library
RUN npm install

# expose port
EXPOSE 1234

CMD [ "npm", "run", "start:dev" ]