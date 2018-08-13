# github-telescope

See all your starred Github repositories at one single place.Sort and filter by stars, forks, language etc. [Screenshots Here!](#screenshot)
I built this sheerly to solve my problem of not being go back and find repositories all in one place.

### Demo: https://github-telescope.com/


### Technologies:

- Front-End: React, Redux, TypeScript, Post CSS, Bootswatch
- Backend: Node, Express.js, TODO: Redis Cache
- Tools: Prettier Pre-commit, Webpack, webpack-dev-server express middelware with React Hot Module to livereload changed code.

### ToDo:

- [x] Setup
- [x] Fetch & display user starred repositories.
- [x] Search through repositories name, description and details.
- [ ] Sort repositories by
  - [ ] Date updated
  - [ ] Stars, Forks, Watch Count
- [ ] Filter repositories by
  - [ ] Date updated
  - [ ] Stars, Forks, Watch Count
  - [ ] Programming languages
- [ ] Backend
  - [ ] Add custom endpoints wrappers for Github API endpoints.
  - [ ] Request Github endpoints with OAuth token
  - [ ] Implement redis to cache Github requests for certain period.
- [x] Deployment
  - [x] Add webpack production build config.
  - [x] Configure webpack devserver for dev env only.
  - [x] Deploy on EC2 with Nginx & supervisorctl.

### Screenshots

1. Search Screen
   ![Search Screen](https://raw.githubusercontent.com/sandiprb/github-telescope/master/screenshots/SearchScreen.png)

2. Repositories Dashboard
   ![Search Screen](https://raw.githubusercontent.com/sandiprb/github-telescope/master/screenshots/Dashboard.png)

### Getting Started

clone

```sh
git clone git@github.com:sandiprb/github-telescope.git
```

install dependencies

```
yarn
```

run server

```sh
yarn dev
```

### License

MIT © [Sandip Baradiya](https://twitter.com/sandip_rb)
