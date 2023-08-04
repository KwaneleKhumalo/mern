# Getting Started with the MERN-DB-APP - SERVER

## Install Server dependencies: 
In the directory, run:

`npm install`

### Modify the .env variables

Use the `example.env` as a guide for your variables. 

**Note: The server will not start without connecting to Mongodb** 


#### Running the Server: 
In the project directory, run: 

`npm run dev`

**Server will Run on port 4000**


##### Server Directory Structure: 

### `Controllers`: Houses primary functions and exports them for routes
### `Routes`: Houses primary routes
### `Middleware`: Houses all your middleware functions
### `Models`: Your schemas live here
### `Utils` : Necessary Utility/Configuration/Helper Functions. The `/server/utils/runApp.js` is responsible for connecting to the db and running the application. 
### `.env` : Environment Variables. Keep all these secret
### `server.js` : Entry File.


###### DISCLAIMER: 

**This is a basic Authentication application**

`Modify the application to enhance its security features.`

`This application is intended to be used as a starting point for your express applications.`

`This application is built to be scalable. Go through the files, and enhance its capabilities.`


**If you don't understand the tech stack utilized. Please learn more about the stack before proceeding so you can understand what's going on with the code.** 
