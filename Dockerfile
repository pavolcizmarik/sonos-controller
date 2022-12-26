FROM node:16

RUN apt-get update && \
    apt-get install -y git && \
    apt-get clean autoclean && apt-get autoremove --yes && \
    rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/pavolcizmarik/sonos-controller.git

WORKDIR /client
RUN npm install && \
    npm run build && \
    mv dist ../server/

WORKDIR /
RUN rm -rf client

WORKDIR /server
RUN npm install && \
	npm install https://github.com/sonos-web/sonos-web.git && \
    mv .env.production .env && \
    printf "\nREGION=EU\n" >> .env && \
    printf "\nENHANCE_METADATA=true\n" >> .env

EXPOSE 5050
CMD npm start