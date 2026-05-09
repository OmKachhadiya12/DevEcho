import Post from "../model/postModel.js";
import User from "../model/userModel.js";
import {v2 as cloudinary} from "cloudinary";

const createPost = async (req,res) => {
    try {

        const {postedBy,text} = req.body;
        let {img} = req.body;

        if(!(postedBy || img)) {
            return res.status(400).json({error: "All feilds are required."});
        }
        
        const user = await User.findById(postedBy);

        if(!user) {
            return res.status(400).json({error: "User not found."});
        }

        if(user.id.toString() != req.user._id.toString()) {
            return res.status(401).json({error: "Unauthorized to creates the Post for the another User."})
        }
        
        const maxLength = 500;
        
        if(text.length > maxLength) {
            return res.status(400).json({error: `Text length should be less then ${maxLength}.`});
        }

        if(img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({postedBy,text,img});

        await newPost.save();

        res.status(201).json({message: "Post created successfully.",newPost});
        
    } catch (error) {

        res.status(500).json({error: "Internal server error."});
        console.error("Error in Creating the Post of the User -> ",error.message);
        
    }
}

const getPost = async (req,res) => {
    try {

        const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		res.status(200).json({ post });
        
    } catch (error) {

        res.status(500).json({error: "Internal server error."});
        console.error("Error in Getting the Post -> ",error.message);
        
    }
}

const deletePost = async (req,res) => {
    try {

        const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

        if(post.postedBy.toString() != req.user._id) {
            return res.status(401).json({error: "Unauthorized to delete the Post."});
        }

        if (post.img) {
			const imgId = post.img.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
		}

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Post deleted successfully" });
        
    } catch (error) {

        res.status(500).json({error: "Internal server error."});
        console.error("Error in Deleting the Post -> ",error.message);
        
    }
}

const likeUnlikePost = async (req,res) => {
    try {

        const {id:postId} = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({error: "Post not found."});
        }

        const userLikedPost = post.likes.includes(userId);

        if(userLikedPost) {

            await Post.findByIdAndUpdate(postId,{$pull: {likes: userId}});
            return res.status(200).json({message: "Post unliked successfully."});

        } else {

            await Post.findByIdAndUpdate(postId,{$push: {likes: userId}});
            return res.status(200).json({message: "Post liked successfully."}); 

        }
        
    } catch (error) {

        res.status(500).json({error: "Internal server error."});
        console.error("Error in Liking/Unliking the Post -> ",error.message);
        
    }
}

const replyToPost = async (req,res) => {
    try {

        const {id: postId} = req.params;

        const {text} = req.body;

        const {_id: userId} = req.user;
        const username = req.user.username;
        const profilePic = req.user.profilePic;

        if(!text) {
            return res.status(400).json({error: "text feild is required."});
        }

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({error: "Post not found."});
        }

        post.replies.push({userId,username,profilePic,text});

        await post.save();

        res.status(200).json({message: "Replied successfully.",post});
        
        
    } catch (error) {

        res.status(500).json({error: "Internal server error."});
        console.error("Error in Replying to the Post -> ",error.message);
        
    }
}

const getFeedPost = async (req,res) => {
    try {

        const {_id: userId} = req.user;

        const user = await User.findById(userId);
        
        if(!user) {
            return res.status(404).json({error: "User not found."});
        }

        const following = user.following;

        const feedPosts = await Post.find({postedBy: {$in: following}}).sort({createdAt: -1});

        res.status(200).json(feedPosts);
        
    } catch (error) {

        res.status(500).json({error: "Internal server error."});
        console.error("Error in Feeding the Post -> ",error.message);
        
    }
}

const getUserPosts = async (req,res) => {
    const {username} = req.params;
    try {

        const user = await User.findOne({username});

        if(!user) {
            return res.status(404).json({error: "User not found."});
        }

        const posts = await Post.find({postedBy: user._id}).sort({createdAt: -1});
        
        res.status(200).json(posts);
        
    } catch (error) {

        res.status(500).json({error: "Internal server error."});
        console.error("Error in Getting the User's Post -> ",error.message);
        
    }
}

export { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPost, getUserPosts };