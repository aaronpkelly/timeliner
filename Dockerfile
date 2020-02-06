FROM nginx

# a read-only github packages api token, in order to run 'npm install'
ENV AUTH_TOKEN=fa7e13e738b20e7ef3e54e1a7a443f7e75766302

COPY . /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html

RUN apt-get update && \
        apt-get install -y curl && \
        curl -sL https://deb.nodesource.com/setup_13.x | bash - && \
        apt-get install -y nodejs

RUN npm set registry https://npm.pkg.github.com/aaronpkelly
RUN echo "//npm.pkg.github.com/:_authToken=${AUTH_TOKEN}" >>.npmrc
# RUN npm update --save
RUN npm install