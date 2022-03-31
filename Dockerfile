FROM node:17-alpine

# Create directory
WORKDIR /usr/src/app

COPY ./package.json ./package.json

# Install all the dependencies
RUN npm i

# Copy the source code and config
COPY ./app ./app
COPY ./tsconfig.json ./tsconfig.json

# Build
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
