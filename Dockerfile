# base image
FROM node:20-alpine3.17

# set workdirectory
WORKDIR /usr/express-counter

# copy just package.json
COPY ./package.json ./

# install node depedencies
RUN npm install

# copy rest of source files
COPY index.js .

CMD ["npm", "start"]
