FROM node:16

RUN apt-get update && \
    apt-get install -y git && \
    apt-get clean autoclean && apt-get autoremove --yes && \
    rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/pavolcizmarik/sonos-controller.git

WORKDIR /sonos-controller/client
RUN npm install && \
    npm run build && \
    mv dist ../server/

WORKDIR /sonos-controller
RUN rm -rf client

WORKDIR /sonos-controller/server
RUN npm install && \
	npm install https://github.com/stufisher/node-sonos#v1.15.0-test && \
    mv .env.production .env && \
    printf "\nREGION=EU\n" >> .env && \
    printf "\nENHANCE_METADATA=true\n" >> .env

EXPOSE 5050
CMD npm start