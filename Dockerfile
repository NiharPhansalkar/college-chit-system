FROM quay.io/ankitpati/tigress

RUN mkdir src
WORKDIR src/
RUN git clone https://github.com/NiharPhansalkar/college-chit-system.git
WORKDIR college-chit-system/server_files/
RUN node loginServer.js
