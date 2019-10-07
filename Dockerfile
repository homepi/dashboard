FROM ubuntu

# Update packages and install curl
RUN apt-get update\
    && apt-get install -y curl

# Installing caddy
RUN curl https://getcaddy.com | bash -s personal

# Checking caddy version
RUN caddy -version

# Creating work directory
RUN mkdir /HomePi

# Choosing work directory
WORKDIR /HomePi

# Adding project to work directory
RUN cp development.caddy /HomePi\
    && cp ./dist /HomePi/public

# Exposing port
EXPOSE 80

# Running project with caddy
CMD ["caddy", "-conf", "/HomePi/development.caddy"]