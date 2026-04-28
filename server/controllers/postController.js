import Post from "../model/postModel.js";
import User from "../model/userModel.js";

const createPost = async (req,res) => {
    try {

        const {postedBy,text,img} = req.body;

        if(!(postedBy || img)) {
            return res.status(400).json({message: "All feilds are required."});
        }
        
        const user = await User.findById(postedBy);

        if(!user) {
            return res.status(400).json({message: "User not found."});
        }

        if(user.id.toString() != req.user._id.toString()) {
            return res.status(401).json({message: "Unauthorized to creates the Post for the another User."})
        }
        
        const maxLength = 500;
        
        if(text.length > maxLength) {
            return res.status(400).json({message: `Text length should be less then ${maxLength}.`});
        }

        const newPost = new Post({postedBy,text,img});

        await newPost.save();

        res.status(201).json({message: "Post created successfully.",newPost});
        
    } catch (error) {

        res.status(500).json({message: "Internal server error."});
        console.error("Error in Creating the Post of the User -> ",error.message);
        
    }
}

const getPost = async (req,res) => {
    try {

        const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		res.status(200).json({ post });
        
    } catch (error) {

        res.status(500).json({message: "Internal server error."});
        console.error("Error in Getting the Post -> ",error.message);
        
    }
}

const deletePost = async (req,res) => {
    try {

        const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

        if(post.postedBy.toString() != req.user._id) {
            return res.status(401).json({message: "Unauthorized to delete the Post."});
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Post deleted successfully" });
        
    } catch (error) {

        res.status(500).json({message: "Internal server error."});
        console.error("Error in Deleting the Post -> ",error.message);
        
    }
}

const likeUnlikePost = async (req,res) => {
    try {

        const {id:postId} = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({message: "Post not found."});
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

        res.status(500).json({message: "Internal server error."});
        console.error("Error in Liking/Unliking the Post -> ",error.message);
        
    }
}

export { createPost, getPost, deletePost, likeUnlikePost };