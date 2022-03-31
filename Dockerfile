FROM node:17-alpine

# Create directory
WORKDIR /usr/application/

COPY ./package.json .

# Install all the dependencies
RUN npm i

# Copy the source code and config
COPY ./app ./app/
COPY ./static ./static
COPY ./tsconfig.json .

# Build
RUN npm run build


EXPOSE 9000

CMD ["npm", "run", "start"]
