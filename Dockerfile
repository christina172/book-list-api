FROM node:20.10.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
# CMD npx prisma migrate deploy && npm run start:dev
CMD ["npm", "run", "start:dev"]