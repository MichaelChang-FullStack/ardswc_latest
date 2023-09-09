#!/bin/bash

install() {
  echo "Installing..."
  docker-compose up --build -d
}

remove() {
  echo "Removeing..."
  docker-compose down
}

reset() {
  echo "Resetting..."
  docker-compose down &
  wait
  docker-compose up --build -d
}

case "$1" in
  install)
    install
    ;;
  remove)
    remove
    ;;
  reset)
    reset
    ;;
  *)
esac
