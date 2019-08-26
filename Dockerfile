FROM node:12.8.1-stretch AS builder

WORKDIR /app

COPY package.json yarn.lock /app/
RUN set -ex; \
  \
  yarn install --production; \
  \
  find /app -depth -type f -a \
    \( \
      -name '*.md' -o -name '*.markdown' -o -name '*.htm?' -o -name '*.txt' \
        -o \
      -name 'LICENSE*' -o -name 'license*' \
        -o \
      -name '.editorconfig' -o -name '.prettier*' -o -name '.eslint*' -o -name '.lint' -o -name '.babel*' \
        -o \
      -name '.git*' -o -name '.*ignore' -o -name 'yarn.lock' -o -name '.yarn*' \
        -o \
      -name '.y?ml' \
    \) -exec rm -rf '{}' +; \
  \
  find /app -depth -type d -a \
    \( \
      -name '.git*' \
        -o \
      -name 'test*' -o -name 'example*' \
        -o \
      -name '.bin' -o -name 'bin' \
    \) -exec rm -rf '{}' +

COPY --chown=root:node . .

FROM node:12.8.1-alpine

WORKDIR /app

COPY --from=builder /app /app

USER node
EXPOSE 9144
CMD [ "node", "." ]
