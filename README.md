# Northcoders News API

## Background

Created as the back end project of my coding boot camp with Northcoders, this API has been built to then use with my front end block of the course. The final project will be a mini Reddit style news forum.

It is a  PSQL database which you can visit here: https://berni-nc-news.herokuapp.com/api

## Getting started
### Cloning
To get started with the API, just clone the repository to your desired location and then navigate into the cloned folder.

### Install dependancies
Once in the folder, run the following code to ensure all dependencies are installed :

`npm install`

### Seeding and .env Files
To access the correct databases locally, create the below 2 env files and save them within the root directory:

`.env.devlopment set to PGDATABASE=nc_news` 

and

`.env.test set to PGDATABASE=nc_news_test`

To seed the databases, the run 

`npm seed`

## Testing
Tests for the project are created using jest and all tests out comes can be viewed by running

`npm test`

## Minimum Versions of Technologies
Node.js version `v16.0.0`

PostgreSQL version `v12.9`

Thank you for viewing :)
