FROM ubuntu

# Update packages and install curl
RUN apt-get update\
    && apt-get install -y curl

# Installing caddy
RUN curl https://getcaddy.com | bash -s personal

# Checking caddy version
RUN caddy -version

# Creating work directory
RUN mkdir /home-pi

# Selecting work directory
WORKDIR /home-pi

# Adding built project to work directory
RUN cp ./dist ./development.caddy /home-pi

# Exposing port
EXPOSE 80

# Running project with caddy
CMD ["caddy", "-conf", "/home-pi/development.caddy"]