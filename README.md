# Getting Started

###### Install npm dependencies
`npm install`

###### Run the node server (production mode)
`npm start`

###### Run the node server (development mode)
`npm run dev`

###### Viewing the application in your browser
`http://localhost:3000`

# Schema

## dz_js_user

- id (integer)
- login (string)
- hashedPassword (string)
- salt (string)
- name (string)
- isLogged (boolean)
- markers (array)
- created (date)

# Resources

## user
```
POST              /api/user/registration
PUT               /api/user/login
PUT               /api/user/:id/logout
GET               /api/markers/:id
PUT               /api/markers/:id
```

## markers
```
GET               /api/markers/:id
PUT               /api/markers/:id
```