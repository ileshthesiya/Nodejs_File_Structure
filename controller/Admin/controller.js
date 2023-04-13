const admin = require('../../model/model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenObj = require("../../Token/token")

exports.registerAdmin = async (req, res) => {
    const EmailExits = await admin.findOne({ email: req.body.email })
    const NumberExits = await admin.findOne({ mobilenumber: req.body.mobilenumber })
    if (EmailExits) {
        return res.status(400).send({
            Message: "Email Already Exist"
        })
    }
    else if (NumberExits) {
        return res.status(400).send({
            Message: "Mobile Number Already Exist"
        })
    }
    else {
        const data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            mobilenumber: req.body.mobilenumber,
            photo: req.file.path
        }
        if (data.password === data.confirmPassword) {
            await admin.create(data, (err, result) => {
                if (err) throw err;
                else {
                    res.status(200).send({ Message: "Create Admin Successfully Done","data":result })
                }
            })
        } else {
            res.status(400).send({ Message: "Password Does Not Match" });
        }
    }
};

exports.loginAdmin = async (req, res) => {
    const result = await admin.findOne({ email: req.body.email });
    const secret = process.env.SECRET;
    if (!result) {
        return res.status(400).send({ Message: "Please Enter Valid Email" })
    };
    if (req.body.password === result.password) {
        const token = jwt.sign({
            userId: result.id,
            email: result.email,
        }, secret, { expiresIn: "1d" });
        tokenObj.token = token;
        res.status(200).send({ result: result.email, token: token })
    } else {
        res.status(400).send({ Message: "Password is incorrect" });
    }
};

exports.getAdminList = async (req, res) => {
    const result = await admin.find({});
    if (!result || result == "") {
        res.status(400).send({ status: "true", Message: "Empty Set" })
    }
    res.status(200).send({ status: "True", Result: "DataFind Successfully Done,", data: result })
}

exports.getAdminById = async (req, res) => {
    const id = req.params.id;
    const result = await admin.findOne({ _id: id });
    if (!result) {
        res.status(400).send({ status: "False", Message: "Can't Find data With Given Id" })
    }
    res.status(200).send({ status: "True", Result: "DataFind Successfully Done", data: result })
}

exports.updateAdmin = async (req, res) => {
    const result = await admin.findByIdAndUpdate(req.params.id, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        mobilenumber: req.body.mobilenumber,
        photo: req.files
    },{new:true})
    console.log(result,'result')
    if (!result) return res.status(500).send({ Message: "Can't find Farmer Data with given id" })
    res.status(200).send({ Message: "Your Data Successfully Updated", data: result })

    // admin.findByIdAndUpdate(req.body.id,
    //     {
    //              firstname: req.body.firstname,
    //             lastname: req.body.lastname,
    //             email: req.body.email,
    //             password: req.body.password,
    //             confirmPassword: req.body.confirmPassword,
    //             mobilenumber: req.body.mobilenumber,
    //             photo: req.files 
    //     },
    //          function (err, data) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         else {
    //             res.send(data);
    //             console.log("Data updated!");
    //         }
    //     });
}





exports.logOutAdmin = async (req, res) => {
    const id = req.params.id;
    const result = await admin.findByIdAndDelete({ _id: id });
    if (!result) {
        res.status(400).send({ status: "False", Message: "Can't Find data With Given Id" });
    }
    res.status(200).send({ status: "True", Message: "LogOut SuccessFully Done", data: result });
}
