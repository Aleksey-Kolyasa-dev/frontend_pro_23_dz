# Do It Test Task App #

# See Demo at:
https://doit-test-demo.herokuapp.com

# Getting Started

###### Install npm dependencies
`npm install`

###### Run the node server (production mode)
`npm start`

###### Run the node server (development mode)
`npm run dev`

###### Viewing the application in your browser
`http://localhost:8000`

# Schema

## doituser

- id (integer)
- login (string)
- hashedPassword (string)
- salt (string)
- name (string)
- isLogged (boolean)
- markers (array)
- created (date)

# Resources

## doitusers
```
POST              /api/users/registration
POST              /api/users/login
PUT               /api/users/logout/:id
PUT               /api/users/saveMarkers/:id
GET               /api/users/getMarkers/:id
```

# TEST TASK DESCRIPTION
1) Create a git repository on github.com

2) Use AngularJS 1st version

3) Configure webpack.config.js

    a) Babel + es6

    b) Less to css compilation

    c) Implement NORMAL PROJECT ARCHITECTURE (.gitignore, src, build, each
    component should be presented in separated files using es6 module system)

4) Create some simple markup (of course use routing for the pages, we create SPA)

    a) Authorization

    b) Main page

    c) About author

5) Draw simple map with point of your geolocation

6) Implement zoom in/out buttons on a map

7) Click on a map has to create a marker

8) Implement save and show buttons – save button saves all the created markers, show
    button – shows it

9) When clicking on the save button all markers should be sent to the server

    a) Create a back-end (node.js + express + mongodb)

    b) Create a user api

    c) Create an api to save location array

    d) Create a GET request to fetch all saving markers

    e) Authorization (Basic auth)

10) Review http://api.2gis.ru/doc/maps/quickstart/

