#!/bin/bash
UID=$(id -u) & GID=$(id -g) & docker-compose -f docker-compose.dev.yml up --build -d