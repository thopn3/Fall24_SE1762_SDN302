const createHttpError = require("http-errors");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SignUp
async function signUp(req, res, next){
    try {
        if(req.body){
            const newUser = new db.Users({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, parseInt(process.env.SECRET_PASSWORD)),
                email: req.body.email
            });
            
            if(req.body.roles){
                // Admin create new user
                const roles = await db.Roles.find({name: {$in: req.body.roles}}).exec();

                // Update role -> New user created
                newUser.roles = roles?.map(r => r._id);
                // Save to DB
                await db.Users.create(newUser).then(addedUser => res.status(201).json({
                    message: "Registed successfully",
                    addedUser: addedUser
                }));
            }else{
                // Visitor registration
                const role = await db.Roles.findOne({name: "member"}).exec();
                newUser.roles = [role._id];
                await db.Users.create(newUser).then(addedUser => res.status(201).json({
                    message: "Registed successfully",
                    addedUser: addedUser
                }));
            }
        }
    } catch (error) {
        next(error);
    }
}

// SignIn
async function signIn(req, res, next){
    try {
        if(!req.body.username || !req.body.password)
            throw createHttpError.BadRequest("Username or password are required");
        
        const existUser = await db.Users.findOne({username: req.body.username}).populate("roles","-_v").exec();
        if(!existUser)
            throw createHttpError.NotFound("This user not registered");

        const isMatchPassword = bcrypt.compareSync(req.body.password, existUser.password);
        if(!isMatchPassword)
            throw createHttpError.Unauthorized("Incorrect password");
        
        const authorities = []; // Chua cac roles name
        for(let i = 0; i < existUser.roles.length ; i++){
            authorities.push(`ROLE_${existUser.roles[i].name.toUpperCase()}`);
        }

        // Generate Access Token
        const token = jwt.sign({id: existUser._id}, process.env.SECRET_KEY, {
            algorithm: process.env.ALGORITHM,
            expiresIn: process.env.ExpIn
        });

        // return
        res.status(200).json({
            token: token,
            userInfo: {
                username: existUser.username,
                email: existUser.email
            },
            authorities: authorities
        });

    } catch (error) {
        next(error);
    }
}

const AuthController = {
    signUp,
    signIn,

}

module.exports = AuthController;