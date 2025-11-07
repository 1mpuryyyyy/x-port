FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
ARG VITE_API_BASE_URL=https://backend.xport-garant.com/api
RUN echo "VITE_API_BASE_URL=$VITE_API_BASE_URL" > .env.local
RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
