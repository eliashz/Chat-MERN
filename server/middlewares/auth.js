const jwt = require('jwt-then');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) 
            return res.status(401).json({ message: "Forbidden."})
        const payload = await jwt.verify(token, process.env.SECRET);        
        req.payload = payload;
        next();
    } catch (err) {
        res.status(401).json({ message: "Forbidden."})
    }
};