FROM quay.io/ankitpati/tigress

RUN mkdir src
RUN cd src/ && \
    git clone https://github.com/NiharPhansalkar/college-chit-system.git && \
    cd college-chit-system/server_files/ && \
    node loginServer.js
