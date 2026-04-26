import User from "../model/userModel.js";

const signupUser = async (req,res) => {
    try {

        const { name,username,email,password } = req.body;

        if([name,username,email,password].some((feild) => {feild?.trim() == ""})) {
            return res.status(400).json({message: "All feilds are required."});
        }

        const existedUser = await User.findOne({
            $or: [{email},{username}]
        });

        if(existedUser) {
            return res.status(400).json({message: "User already Exists."});
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
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email
            })
        } else {
            res.status(400).json({message: "Invalid User details."})
        }

    } catch (error) {
        
        res.status(500).json({message: "Interna server error."});
        console.error("Error in creating the new User -> ",error.message);

    }
}

export { signupUser };