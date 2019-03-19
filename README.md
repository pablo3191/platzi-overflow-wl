# PlatziOverflow

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.2.

## Development server

Steps:

- Install dependencies: run `npm install`
- Up MongoDB instance: run `mongod`
- Run `npm start` for init the frontend and backend servers. 
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deploy to heroku

- Install heroku cli
- Create a new app: run `heroku create` 
- Set connection string to database: `heroku config:set MONGODB_URI=url`
- Set secret string: `heroku config:set SECRET=mySecretPassword`
- Push your code to heroku: run `git push heroku master`.