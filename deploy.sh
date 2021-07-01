#!/bin/sh
set -e
# set -o pipefail

BRANCH=$1
CHARTNAME=$2
REPO_NAME=$3

if [ $BRANCH = "staging" ]
then
  namespace="default"
  cluster_zone=${GOOGLE_STAGING_COMPUTE_ZONE}
  cluster_name=${GOOGLE_STAGING_CLUSTER_NAME}
  project_id=${GOOGLE_STAGING_PROJECT_ID}
elif [ $BRANCH = "master" ]
then
   namespace="default"
   cluster_zone=${GOOGLE_COMPUTE_ZONE}
   cluster_name=${GOOGLE_CLUSTER_NAME}
   project_id=${GOOGLE_PROD_PROJECT_ID}
else
   echo "*****unsupported branch******"
exit
fi

echo "Deploying service: ${CHARTNAME}"

echo "Using namespace: $namespace"


rm -rf helm-charts 

git clone -b "$GITHUB_PAGES_BRANCH" https://$GITHUB_OAUTH:x-oauth-basic@github.com/Autochek-Africa/helm-charts.git

CHART=$( ls -t helm-charts/$CHARTNAME/ | head -n 1 )

helm inspect values helm-charts/$CHARTNAME/$CHART

echo "Connecting to cluster: $cluster_name in zone: $cluster_zone"

while ! gcloud container clusters get-credentials $cluster_name --region $cluster_zone --project $project_id
do
  echo "Authenticating with service account..."
  if [ $BRANCH = "staging" ]
  then
      gcloud auth activate-service-account --key-file=helm/staging-key.json
  elif [ $BRANCH = "master" ]
  then
      gcloud auth activate-service-account --key-file=helm/prod_key.json
  fi
done


if [ $BRANCH = "staging" ]
then
    # kubectl config use-context gke_applied-oxygen-284218_europe-west3_autochek-staging-cluster
    helm upgrade -i $CHARTNAME helm-charts/$CHARTNAME/$CHART --namespace $namespace -f helm/staging.yaml
elif [ $BRANCH = "master" ]
then
    # kubectl config use-context gke_composite-store-284103_europe-west2_autochek-prod
    helm upgrade -i $CHARTNAME helm-charts/$CHARTNAME/$CHART --namespace $namespace -f helm/prod.yaml
fi
