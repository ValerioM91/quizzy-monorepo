#!/bin/bash
# Use this script to start a docker container for a local development database

# TO RUN ON WINDOWS: 
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh`

# On Lunux and macOS you can run this script directly - `./start-database.sh`

DB_CONTAINER_NAME="quizzy"
POSTGRES_DATABASE="quizzy_db"

if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  docker start $DB_CONTAINER_NAME
  echo "Database container started"
  exit 0
fi

docker run --name quizzy -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5433:5432 -d postgres

echo "Database container was succesfuly created"


