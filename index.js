const express = require('express')
const app = express()
const { faker } = require('@faker-js/faker');


require('dotenv').config()

// Set up ejs as the view engine
app.set('view engine', 'ejs');

// set folder views
app.set('views', __dirname + '/views');

// function to generate user
const generateUser = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const phone = faker.phone.number();
    const name = firstName + " " + lastName;
    return {
        name,
        email,
        phone
    };
}

// return index file
app.get('/', async (req, res) => {

    // get user data
    const data = generateUser();
    res.render('index', data);
});

app.get('/generateuser', (req, res) => {
    res.json(generateUser());
});

app.get('/generateusers', (req, res) => {
    // parse the number of users from the environment variables
    const numberOfUsers = parseInt(process.env.NUMBER_OF_USERS);
    // create an array of users
    const users = Array(numberOfUsers).fill().map(generateUser);
    // return the users as json
    res.json(users);
})
app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});