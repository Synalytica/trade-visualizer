FROM node:13.12.0-alpine
LABEL author=pk13055, version=0.5.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install serve pm2 react-scripts@3.4.1 -g --silent

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

ENV NODE_PORT=5000
ENV PORT=5000

ENTRYPOINT ["./entrypoint.sh"]
