FROM php:7.4-fpm

RUN su
RUN apt-get update && apt-get install -y net-tools
