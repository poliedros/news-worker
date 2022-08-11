FROM node:16.13.1 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16.13.1 as production

ARG NEWS_API_KEY=''
ENV NEWS_API_KEY=${NEWS_API_KEY}

ARG COUNTRY='br'
ENV COUNTRY=${COUNTRY}

ARG CATEGORY='general'
ENV CATEGORY=${CATEGORY}

ARG MONGO_URL=''
ENV MONGO_URL=${MONGO_URL}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]