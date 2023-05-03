const mongoose = require('mongoose');

const connectionDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            'DB connected with ',
            connect.connection.host,
            connect.connection.name
        );
    } catch (e){
        console.log(e);
        process.exit(1);
    }
};

module.exports = connectionDb;