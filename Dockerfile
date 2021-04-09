FROM node:14.16.0-alpine3.11
LABEL Maintainer="Adelys Alberto Belen"
ENV APP_DIR microservice_template
ENV TZ=America/Buenos_Aires
WORKDIR /usr/app/${APP_DIR}
COPY package*.json ./
ARG token
ENV NPMTOKEN=${token}
RUN npm install
COPY . .
#RUN npm run test
RUN npm prune --production
EXPOSE 8080
CMD [ "npm" , "start" ]
