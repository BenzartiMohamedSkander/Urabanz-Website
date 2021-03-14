const Admin = require("../models/Admin");


const bcrypt = require("bcryptjs");


const jwt = require("jsonwebtoken");


const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });


//Administrator register
exports.registerAdmin = async (req,res) => {
    const {name ,email,telephone,password} = req.body;
    try {
        
       const newAdmin = new Admin ({
           name ,
           email,
           telephone,
           password});

       await newAdmin.save();

       res.status(201).json({msg:"Admin added successfully"})



    } catch (error) {
        console.log(error);
        res.status(501).json({msg:"Admin add fail"})
        
    }

}




//Administrator login
exports.loginAdmin = async (req,res) => {
    const {email,password} = req.body;
    const admin = await Admin.findOne({email});
    if (!admin) return res.status(401).json({ msg: "Wrong email" });

    // const isMatch = await bcrypt.compare(password, admin.password);
    const isMatch = password === admin.password;
  
    if (!isMatch) return res.status(401).json({ msg: "Wrong password" });

    try {
        
        const payload = {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            telephone: admin.telephone,
        }

        const token = await jwt.sign(payload, process.env.secretOrKey);

        return res.status(200).json({ token: `Bearer ${token}` });
   


    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Login fail"})
        
    }

}