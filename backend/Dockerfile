FROM node:18.0.0-slim AS builder

ENV APP_USER=gnamadmin
RUN groupadd -g 1002030000 -o $APP_USER
RUN useradd -m -l -u 1002030000 -g 1002030000 -o -s /bin/bash ${APP_USER}

RUN chown -R $APP_USER /usr/local/lib && \
    chown -R $APP_USER /usr/local/bin

ENV APP_HOME=/home/${APP_USER}
WORKDIR ${APP_HOME}
COPY --chown=gnamadmin:gnamadmin . .
USER ${APP_USER}

RUN npm ci && \
    npm run build    

EXPOSE 4000

ENTRYPOINT [ "node","/home/gnamadmin/dist/app" ] #OK

#ENTRYPOINT ["/bin/bash", "-c", "node /tmp/dist/main"]  //OK
# ENTRYPOINT ["/tmp/docker-entrypoint.sh"] 
#ENTRYPOINT [ "node","/tmp/dist/main" ] #OK



