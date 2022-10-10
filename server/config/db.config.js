const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected.')

    } catch (err) {
        console.log('Failed to connect database', err)
        process.exit();
    }

};

module.exports = connectDB;