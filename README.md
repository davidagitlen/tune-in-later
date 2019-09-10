# Tune In Later

ListenLater is an audiobooks streaming site. When a visitor arrives, there are several genres available to browse. A description pops up when a book is clicked. A search bar is available to search books by title, genre, or author. In order for the user to do anything beyond browsing at descriptions of the audiobooks available, the visitor must login. Once the user has signed in or created a login account, books are available to add to a collection of favorites by clicking the star on the cover. The user can come back to their collection anytime the user is logged in.

## Learning Goals
Write well refactored code using ES6 syntax
Create a user-friendly design
Utilize network requests including GET, POST, & DELETE
Create re-usable and clean components with React
Use Redux’s lifecycle methods, actions, reducers, and connect them to React components
Utilize React components, asynchronous code, route handling, and Redux testing.

## Technology Used
JavaScript
React/Router 4/Redux
The Fetch API
Webpack
Jest & Enzyme

## How To Interact with ListenLater
### Project Setup

* Clone down this(https://github.com/davidagitlen/tune-in-later) repo and run 
`npm install`, `npm start` and visit `localhost:3000/`
* In a separate directory, clone down this(https://github.com/turingschool-examples/favorites-tracker-api) repo and run `npm install`
* If you don't have postgresSQl, scroll down to `Setup Postgresql` and follow those steps
* Run `npm start` - visit `localhost:3001/` - you should see a JSON response some information

## Setup Postgresql

#### IMPORTANT: If you already have Postgresql on your computer for some reason, you will need to uninstall it
For information on how to do this read [this](https://postgresapp.com/documentation/remove.html)

#### What is PostgreSQL?
* PostgreSQL is a powerful, open-source relational database system

#### Installation:
* Head over to [Postgres.app](http://postgresapp.com/) to download and install PostgreSQL
* When you click `initialize`, you should now be able to see that postgreSQL is running
* To be able to use the command line tools, you will need to run the following commannd in your terminal to configure your $PATH `sudo mkdir -p /etc/paths.d && echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp`
* You will need to close your terminal window and re-open it for the changes to take effect
  
#### Creating our database
* Make sure you are in the `favorties-tracker-api` directory
* From the command line, run the following command to create a users database `psql -f ./db/tables.sql`
* When you start up the server (`npm install` and `npm start`

#### [PSQL Commands](http://postgresguide.com/utilities/psql.html)

