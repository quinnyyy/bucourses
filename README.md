# BUcourses

[![Build Status](https://travis-ci.org/quinnyyy/bucourses.svg?branch=master)](https://travis-ci.org/quinnyyy/bucourses)


## TODO:
* server/server.ts: Add filter functionality
* server/server.ts: Do error handling
* public3/src/components: Define a type to represent a classinfo

## Things we need to add to the course schema:
* Actual class name (lul)
* Level (0--,1--,2-- etc.)
* College e.g. Engineering, Arts and Sciences, Questrom / ENG, CAS, QST
* Department e.g. Electrical and Computer Engineering, Computer Science / EC CS
* Other stuff as we see fit

## /scraper
**Python** code for scraping course info from https://www.bu.edu/academics/cas/courses/ using **BeautifulSoup4**  
Writes the scraped info to text file and then writes data from text file to **MongoDB Atlas** database.

## /server
**TypeScript** + **node.js** server for API.  
The server opens a connection to **MongoDB Atlas** database and when an api call is made it gets the requested data from the database and then serves it to the client\

## Frontend...
Planning to use **React, Redux, Webpack, Babel**...

