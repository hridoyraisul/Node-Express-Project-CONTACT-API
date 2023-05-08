FROM node:slim
LABEL authors="raisulhridoy"

WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 5001
CMD npm run dev

