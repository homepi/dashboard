FROM ubuntu

# Update packages and install curl
RUN apt-get update\
    && apt-get install -y curl

# Adding yarn repository
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# Installing yarn
RUN apt-get install yarn

# Checking node version
RUN yarn --version

# Installing caddy
RUN curl https://getcaddy.com | bash -s personal

# Checking caddy version
RUN caddy -version

# Creating work directory
RUN mkdir /code

# Choosing work directory
WORKDIR /code

# Adding project to work directory
ADD . /code

# Running npm to install front-end dependencies
RUN yarn install

# Building project
RUN yarn build

# Exposing port
EXPOSE 80

# Running project with caddy
CMD ["caddy", "-conf", "/code/development.caddy"]