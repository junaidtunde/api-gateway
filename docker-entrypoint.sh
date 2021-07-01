#! /bin/sh

apk update

curl -L https://github.com/godolatunji/alpine-protoc-gen-swagger/raw/master/protoc-gen-swagger --output protoc-gen-swagger

chmod +x protoc-gen-swagger

npm --production=false install

npm run gen-proto

npm run build

echo $GCP_KEY > dist/google-service-account.json

npm run start:prod

tail -f /dev/null

#EOF_
