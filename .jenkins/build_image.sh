#! /bin/sh

PROJECT_NAME="micro-api-gateway"

if [[ ((`echo $GIT_BRANCH | grep -c "master"` > 0)) ]]; then
   echo "Deploying image to production repository"
   PROJECT_ID=${env.GOOGLE_PROD_PROJECT_ID}
   gcloud auth activate-service-account --key-file=/root/project/helm/prod_key.json
elif [[ ((`echo $GIT_BRANCH | grep -c "staging"` > 0)) ]]; then
   echo "Deploying image to staging repository"
   PROJECT_ID=${env.GOOGLE_STAGING_PROJECT_ID}
   gcloud auth activate-service-account --key-file=/root/project/helm/staging_key.json
fi

echo "No image deployed required"

apt-get install -qq -y gettext
gcloud --quiet config set project ${PROJECT_ID}
gcloud --quiet config set compute/zone ${env.GOOGLE_COMPUTE_ZONE}

docker build -t ${PROJECT_NAME}-test .
docker tag ${PROJECT_NAME} eu.gcr.io/${PROJECT_ID}/${PROJECT_NAME}:latest
gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin https://eu.gcr.io
docker push eu.gcr.io/${PROJECT_ID}/${PROJECT_NAME}:latest

#EOF
