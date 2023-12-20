const jwt = require('jsonwebtoken');
const admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const addAdmin = async (req, res, next) => {
    const {email,password} = req.body
    let existingAdmin
    try {
        existingAdmin = await admin.findOne({email})
    } catch (err) {
        return console.log(err)
    }

    if (existingAdmin) {
        return res.status(400).json({
            message: "Admin Already Exists"
        })
    }

    let newAdmin 
    const hashedPassword = bcrypt.hashSync(password)
    try {
        newAdmin = new Admin({email: email, password: hashedPassword})
        newAdmin = await admin.save(newAdmin)
    } catch (err) {
        return console.log(err)
    }

    if (!newAdmin) {
        return res.status(400).json({
            message: "Unable to Create Admin"
        })
    }

    return res.status(201).json({
        message: "Admin Created",
        admin: newAdmin
    })
}

const adminLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email && email.trim() === "" &&  
        !password && password.trim() === "") {
        return res.status(400).json({ message: "Invalid Inputs"})
    }
    let existingAdmin;
    try {
        existingAdmin = await admin.findOne({email})
    } catch (err){
        return console.log(err)
    }
    if(!existingAdmin){
        return res.status(401).json({message: "Admin not found"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password)

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"})
    }
    const token = jwt.sign({id: existingAdmin._id}, process.env.SECRET_KEY, {expiresIn: '7d'})
    return res.status(200).json({message: "Authentication Successful", token, id:existingAdmin._id});
}

const getAdmins = async(req, res, next)=>{
    let admins;
    try{
        admins=await admin.find();
    }
    catch(e)
    {
        return res.send(e.message);
    }
    if(!admins)
    {
        return res.status(400).json({message:"cannot get admin"});
    }
    return res.status(200).json({admins});
}

const getAdminByID = async (req, res, next) => {
    const id = req.params.id;
    let admin;
    try {
        admin = await admin.findById(id)
        .populate("addedMovies");
    } catch (err) {
        return console.log(err);
    }
    if (!admin) {
        return console.log("Cannot find Admin");  
    }
    return res.status(200).json({ admin })
};

module.exports = {addAdmin, adminLogin, getAdmins, getAdminByID}