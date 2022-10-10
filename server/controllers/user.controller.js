const mongoose = require('mongoose');
const User = mongoose.model('User');
const brcypt = require('bcrypt');
const jwt = require('jwt-then');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const nameCheck = await User.findOne( { name })
    if (nameCheck) 
        return res.status(400).json({ status: false, message: 'Name already used.'});
    const emailCheck = await User.findOne( { email })
    if (emailCheck) 
        return res.status(400).json({ status: false, message: 'e-mail already used.'})
    //const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email))
        return res.status(400).json({ status: false, message: 'e-mail not supported.' });
    if (password.length < 6) 
        return res.status(400).json({ status: false, message: 'Password must be at least 6 characters long.' });

    const user = new User({ 
        name, 
        email, 
        password: await brcypt.hash(password, 10)
    });

    await user.save();

    res.status(200).json({ 
        status: true,
        message: `User created.`,
        user
    })
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) 
        return res.status(400).json({ status: false, message: "User with this e-mail doesn't exist."});
    const encPassword = await brcypt.compare(password, user.password);

    if (!encPassword) 
        return res.status(400).json({ status: false, message: "Wrong password."});

    const token = await jwt.sign({id: user.id}, process.env.SECRET);

    res.status(200).json({
        status: true,
        message: "User logged.",
        token
    }); 

};