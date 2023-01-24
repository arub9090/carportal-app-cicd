FROM node:18.13.0-alpine
WORKDIR /beApp
COPY . /beApp/
RUN npm install
EXPOSE 8000
CMD ["npm","run","server"]