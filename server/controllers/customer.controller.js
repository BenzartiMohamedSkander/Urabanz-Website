const Customer = require("../models/Customer");
const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");




//Customer register
exports.register = async (req,res) => {


    const {name ,adress,telephone,email,password} = req.body;

    const serachResult = await Customer.findOne({email})

    if (serachResult) return res.status(401).json({msg:"Customer already exist"})

    try {
        const newCustomer = new Customer ({
        name ,
        adress,
        telephone,
        email,
        password});


const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password,salt)


newCustomer.password = hash;
       await newCustomer.save();

       res.status(201).json({msg:"Customer added successfully"})



    } catch (error) {
        console.log(error);
        console.log("Customer add fail");
        res.status(501).json({msg:"Customer add fail"})
        
    }

}


//Customer login
exports.login = async (req,res) => {
    const {email,password} = req.body;
    const customer = await Customer.findOne({email});
    if (!customer) return res.status(401).json({ msg: "Wrong email" });

     const isMatch = await bcrypt.compare(password, customer.password);

  
    if (!isMatch) return res.status(401).json({ msg: "Wrong password" });

    try {
        
        const payload = {
            id: customer._id,
            name: customer.name,
            email: customer.email,
            telephone: customer.telephone,
        }

        const token = await jwt.sign(payload, process.env.secretOrKey);

        return res.status(200).json({ token: `Bearer ${token}` });
   


    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Login fail"})
        
    }

}