import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import getJWTtokenandSetCookie from "../utils/helper/getJWTtokenandSetCookie.js";

const signupUser = async (req,res) => {
    try {

        const { name,username,email,password } = req.body;

        if([name,username,email,password].some((feild) => {feild?.trim() == ""})) {
            return res.status(400).json({error: "All feilds are required."});
        }

        const existedUser = await User.findOne({
            $or: [{email},{username}]
        });

        if(existedUser) {
            return res.status(400).json({error: "User already Exists."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            name,
            username,
            email,
            password: hashedpassword,
        });

        await newUser.save();

        if(newUser) {
            getJWTtokenandSetCookie(newUser._id,res);
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email
            })
        } else {
            res.status(400).json({error: "Invalid User details."})
        }

    } catch (error) {
        
        res.status(500).json({error: "Internal server error."});
        console.error("Error in creating the new User -> ",error.message);

    }
}

const login = async (req,res) => {
    try {

        const {username,password} = req.body;

        if(!(username || password)) {
            res.status(400).json({error: "All details are required."});
        }

        const user = await User.findOne({username});

        if(!user) {
            res.status(404).json({error: "User is not exist."});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({error: "Username or Password is Incorrect."});
        }

        getJWTtokenandSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        })
        
    } catch (error) {

        res.status(500).json({error: "Internal server error."});
        console.error("Error in logging the User -> ",error.message);
        
    }
} 

const logout = async (req,res) => {
    try {

        res.cookie("jwt"," ",{maxAge: "1"});

        res.status(200).json({message: "User logged Out Successfully."});
        
    } catch (error) {

        res.status(500).json({error: "Internal server error."});
        console.error("Error in logging out the User -> ",error.message);
        
    }
}

const followUnfollowUser = async (req,res) => {
    try {

        const id = req.params.id;

        const modifiedUser = await User.findById(id);

        const currentUser = await User.findById(req.user._id);

        if(id == req.user._id.toString()) {
            return res.status(400).json({error: "You cannot follow/unfollow yourself."});
        }
 
        if(!currentUser || !modifiedUser) {
            return res.status(404).json({error: "User not found."});
        }

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing) {

            await User.findByIdAndUpdate(req.user._id,{$pull: {following: id}});
            await User.findByIdAndUpdate(id,{$pull: {followers: req.user._id}});

            return res.status(200).json({message: "You Unfollowed successfully."});

        }else {

            await User.findByIdAndUpdate(req.user.id,{$push: {following: id}});
            await User.findByIdAndUpdate(id,{$push: {followers: req.user._id}});

            return res.status(200).json({message: "You Followed successfully."});

        }
        
    } catch (error) {
        
        res.status(500).json({error: "Internal server error."});
        console.error("Error in Following the User -> ",error.message);

    }
}

const updateprofile = async (req,res) => {
    
    try {

        const {name,username,email,password,profilePic,bio} = req.body;
        const id = req.user._id;

        const user = await User.findById(id);

        if(!user) { 
            return req.status(404).json({error: "User not found."});
        }

        if(req.params.id != id.toString()) {
            return res.status(400).json({error: "You can't change the other's User profile."});
        }

        if(password) {
            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(password,salt);
            user.password = hashedpassword;
        }

        user.name = name || user.name;
		user.email = email || user.email;
		user.username = username || user.username;
		user.profilePic = profilePic || user.profilePic;
		user.bio = bio || user.bio;

        user = await user.save();

        res.status(200).json({message: "Your profile updated successfully.", user });
        
    } catch (error) {
        
        res.status(500).json({error: "Internal server error."});
        console.error("Error in Updating the profile of the User -> ",error.message);

    }
}

const getUserProfile = async (req,res) => {
    try {

        const { username } = req.params;

        const user = await User.findOne({ username }).select("-password").select("-updatedAt");
        
		if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

		res.status(200).json(user);
        
    } catch (error) {

        res.status(500).json({error: "Internal server error."});
        console.error("Error in Getting the profile of the User -> ",error.message);
        
    }
}

export { signupUser, login, logout, followUnfollowUser, updateprofile, getUserProfile };