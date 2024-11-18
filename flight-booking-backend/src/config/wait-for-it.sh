#!/usr/bin/env bash
set -e

TIMEOUT=30
HOST=$1
PORT=$2

echo "Waiting for $HOST:$PORT..."

for i in $(seq 1 $TIMEOUT); do
  nc -z $HOST $PORT && echo "Service is up!" && exit 0
  echo "Retrying in 1 second..."
  sleep 1
done

echo "Service did not start within $TIMEOUT seconds."
exit 1