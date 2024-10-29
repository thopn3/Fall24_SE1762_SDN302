const createHttpError = require("http-errors");
const Db = require("../models");
const jwt = require("jsonwebtoken");

// Hàm xác thực danh tính của người dùng
function verifyToken(req, res, next){
    const token = req.headers["x-access-token"];
    if(!token)
        throw createHttpError.Unauthorized("No token provide!");
    // Xác thực token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err)
            throw createHttpError.Forbidden("Access denied! Error: " + err.message);
        // Bổ sung một thuộc tính mới cho đối tượng request được lấy từ payload của token
        req.userId = decoded.id;
        next();
    });
}

// Hàm kiểm tra vai trò của người dùng là: Member
async function isMember(req, res, next){
    try {
        const existUser = await Db.Users.findById(req.userId).exec();
        if(!existUser)
            throw createHttpError.NotFound("This account not exist!");
        // Lấy roles trong existUser
        const roles = await Db.Roles.find({_id: {$in: existUser.roles}}).exec();

        for (let i = 0; i < roles.length; i++) {
            if(roles[i].name === "member"){
                next();
                return;
            }
        }

        throw createHttpError.Unauthorized("Unauthorized! Account not: Member");

    } catch (error) {
        next(error);
    }
}

// Hàm kiểm tra vai trò của người dùng là: Manager 
async function isManager(req, res, next){
    try {
        const existUser = await Db.Users.findById(req.userId).exec();
        if(!existUser)
            throw createHttpError.NotFound("This account not exist!");
        // Lấy roles trong existUser
        const roles = await Db.Roles.find({_id: {$in: existUser.roles}}).exec();

        for (let i = 0; i < roles.length; i++) {
            if(roles[i].name === "manager"){
                next();
                return;
            }
        }

        throw createHttpError.Unauthorized("Unauthorized! Account not: Manager");
    } catch (error) {
        next(error);
    }
}

// Hàm kiểm tra vai trò của người dùng là: Admin
async function isAdmin(req, res, next){
    try {
        const existUser = await Db.Users.findById(req.userId).exec();
        if(!existUser)
            throw createHttpError.NotFound("This account not exist!");
        // Lấy roles trong existUser
        const roles = await Db.Roles.find({_id: {$in: existUser.roles}}).exec();

        for (let i = 0; i < roles.length; i++) {
            if(roles[i].name === "admin"){
                next();
                return;
            }
        }

        throw createHttpError.Unauthorized("Unauthorized! Account not: Admin");
    } catch (error) {
        next(error);
    }
}

const VerifyAuth = {
    verifyToken,
    isMember,
    isManager,
    isAdmin,
};

module.exports = VerifyAuth;