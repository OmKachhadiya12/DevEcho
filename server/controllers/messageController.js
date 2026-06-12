import Conversation from "../model/conversationModel.js";
import Message from "../model/messageModel.js";

const sendMessage = async (req,res) => {
    try {

       const {recipientId,message} = req.body;
       const senderId = req.user._id;
       
       let conversation = await Conversation.findOne({
            participants: {
                $all: [
                    senderId,
                    recipientId
                ] 
            }
        });

        if(!conversation) {
            conversation = new Conversation({
                participants: [senderId,recipientId],
                lastMessage: {
                    text: message,
                    sender: senderId
                }
            });

            await conversation.save();
        }

        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message
        });

        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage: {
                    text: message,
                    sender: senderId
                }
            })
        ]);

        res.status(201).json(newMessage);
        
    } catch (error) {

        res.status(500).json({error: "error.message"});
        
    }
}

const getMessage = async (req,res) => {

    const {otherUserId} = req.params;
    const {_id: userId} = req.user;

    try {

        const conversation = await Conversation.findOne({
            participants: {
                $all: [
                    userId,
                    otherUserId
                ]
            }
        });

        if(!conversation) {
           return res.status(404).json({error: "Conversation not found."});
        }

        const message = await Message.find({
            conversationId: conversation._id
        }).sort({createdAt: 1});

        res.status(200).json(message);
        
    } catch (error) {

        res.status(500).json({error: "error.message"});
        
    }
}

const getConversation = async (req,res) => {

    try {

        const {_id: userId} = req.user;

        const conversation = await Conversation.find({
            participants: userId
        }).populate({
            path: "participants",
            select: "username profilePic"
        })

        res.status(200).json(conversation);
        
    } catch (error) {
        
        res.status(500).json({error: "error.message"});

    }
}

export {sendMessage,getMessage,getConversation};