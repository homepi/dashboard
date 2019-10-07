# HomePi VueJs Project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Building docker image
```
docker build . --tag=homepi-dashboard
```

### Run docker image
```
docker run -dp 80:80 --restart always homepi-dashboard
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
