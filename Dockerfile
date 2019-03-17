FROM node:11

COPY . .
RUN npm install

EXPOSE 8081
CMD bash -c "npm run serve"