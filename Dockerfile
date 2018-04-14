FROM node:9

RUN mkdir /project
WORKDIR /project
ADD . /project/
RUN npm i