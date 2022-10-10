const mongoose = require('mongoose');
const Chatroom = mongoose.model('Chatroom');

exports.createChatroom = async (req, res) => {
    const { name } = req.body;
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) 
        return res.status(400).json({ status: false, message: `Chatroom name only accepts letters.`});
    if (name.length > 15) 
        return res.status(400).json({message: `Least than 15 characters.`});
    const lowerName = name.toLowerCase();
    const chatroomCheck = await Chatroom.findOne({ name: lowerName });
    if (chatroomCheck) 
        return res.status(400).json({ status: false, message: `Chatroom ${name} already exits.`});

    const chatroom = new Chatroom({
        name: lowerName
    });
    
    await chatroom.save();
    res.status(200).json({ status: true, message: `Chatroom ${name} created.`, chat: chatroom});
};

exports.getAllChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find({});
    if (chatrooms.length === 0) 
        return res.status(204).send();
    res.status(200).json(chatrooms);
};

exports.getOneChatroom = async (req, res) => {
    const id = req.params.id;
    const getChat = await Chatroom.findById(id)
    if (!getChat)
        return res.status(400).json({ status: false, message: `No chat with this ID.` }); 
    res.status(200).json({ status: true, chat: getChat});
}

exports.deleteChatroom = async (req, res) => {
    // Delete chat by ID
    const chatDelete = await Chatroom.findByIdAndDelete(req.body.id);

    if (!chatDelete) 
        return res.status(400).json({ status: false, message: `No chat with this ID.`});  
    res.status(200).json({ status: true, message: 'Chat deleted.'});

    
};