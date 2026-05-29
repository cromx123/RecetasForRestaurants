FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV API_INTERNAL_URL=http://api:4000
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
