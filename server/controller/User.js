const db = require("../database/index");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config
JWT_SECRET="ascefbth,plnihcdxuwy"

const defaultAvatarUrl = "https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png";

const validatePassword=(password)=>{
    const errors=[]
    const passwordChecking=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    if(password.length < 8){
        errors.push("Password must contain at least 8 characters.")
    }
    if(!passwordChecking.test(password)){
        errors.push("Password must contain at least one upper case, one lower case, and one symbol")
    }
    return {
        isValid:errors.length===0,
        errors:errors
    }
}
const signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            image,
            password,
            day,
            year,
            month
          
        } = req.body;

        const hashedPassword = await bcrypt.hash(password,10);
      

        console.log(req.body);

        if (!email || !password || !firstName||!lastName||!day||!year||!month) {
            return res.status(400).send('Missing required fields');
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            return res.status(400).json({
                message: 'Password is too weak',
                errors: passwordValidation.errors
            });
        }



        const getuser = await db.User.findOne({
            where: {
                email: email
            }
        });

        if (getuser) {
            return res.status(400).send("User already exists");
        } else {
            const user = await db.User.create({
                email: email,
                image:image,
                password: hashedPassword,
                firstName: firstName,
                lastName:lastName,
                day:day,
                year:year,
                month:month,
                avatar: defaultAvatarUrl

            });

            console.log('User created:', user);
            res.send(user)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const user = await db.User.findOne({ where: { email } })

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, firstName: user.firstName, lastName:user.lastName,email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName:user.lastName,
                email: user.email,
                type: user.type
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }



};

const getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll(); 
        return res.status(200).json(users); 
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send('Server error');
    }
};



const updateUser =  (req, res) => {
   
        const { id } = req.params;
        
        const { email, firstName, lastName } = req.body;

        const user =  db.User.update(
            { email, firstName, lastName },
            { where: { id }}
        )
        .then((res)=>{
          res.send(res.data)
        })
        .catch((err)=>{
            res.send(err)
            console.log(user.data)
        })

       
}

const updateUserImage= async (req, res) => {
    try {
        const { id } = req.params;
        
        const { image } = req.body;

        const user = await db.User.update(
            { image },
            { where: { id }}
        );

        res.send(user);
        console.log(user.data)
    } catch (error) {
        res.send(error);
        console.log(err)
    }
}


const getOneUser= async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.User.findOne(
            { where: { id: id }}
        );

        if (!user) {
            return res.status(404).send('User not found');
        }
        
        res.send(user);
        console.log(user.data)
    } catch (error) {
        res.send(error);
        console.log(error)
    }
}

 

module.exports = { signup, login , updateUser , getAllUsers, updateUserImage, getOneUser};
