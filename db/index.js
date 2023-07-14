const { connect, connection } = require('mongoose');
const seedUsers = require('./seeder');


//conneting to the database
const dbConnect = async (uri) => {

    await connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => seedUsers())
    .catch(err => console.log(err))
}

module.exports = dbConnect;