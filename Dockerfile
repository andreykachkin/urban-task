FROM node:17-alpine

# Create directory
WORKDIR /usr/src/app

# Copy the source code
COPY . .
COPY .npmrc /root/.npmrc

# Install all the dependencies
RUN npm install

EXPOSE 8080

CMD ["node", "app.js"]
