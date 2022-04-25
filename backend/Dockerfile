FROM node:18.0.0-slim AS builder

ENV APP_USER=backend
RUN groupadd -g 1001 -o $APP_USER
RUN useradd -m -l -u 1001 -g 1001 -o -s /bin/bash ${APP_USER}

RUN chown -R $APP_USER /usr/local/lib && \
    chown -R $APP_USER /usr/local/bin

ENV APP_HOME=/home/${APP_USER}
WORKDIR ${APP_HOME}
COPY --chown=backend:backend . .
USER ${APP_USER}

RUN npm ci && \
    npm run build    

EXPOSE 4000

ENTRYPOINT [ "node","/home/backend/dist/app" ]



