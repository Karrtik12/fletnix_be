# FletNix Back-End

To run this application in your local machine, follow these steps:

- Clone this repo
- Open the location in terminal
- Run `npm install`
- Create .env file in root location and create a variable with key `dburl` with value as your database's url. Alternatively, in `config/db.js`, replace `process.env.dburl` with your database's url
- (Optional) In `.env`, create a variable for the port you want to run your application, named `PORT`
- Then in terminal run `node --env-file=.env server.js`
- All set!!

### Note:

- Your local machine should have Node.js and npm installed
