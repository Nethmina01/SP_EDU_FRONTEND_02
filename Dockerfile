FROM node:18-buster
RUN mkdir /app
COPY package.json /app/
WORKDIR /app
COPY . ./

ENV NEXT_PUBLIC_APP_URL=https://www.mydomain.com

RUN yarn install
RUN yarn build
EXPOSE 8087
CMD ["yarn", "run","start"]