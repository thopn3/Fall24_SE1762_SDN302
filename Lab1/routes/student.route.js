const express = require("express");
const {json} = require("body-parser");
const data = require("../database.json");

const studentRouter = express.Router(); // productRouter: mini Express
studentRouter.use(json());


// Get all students
studentRouter.get("/list", async (req, res, next) => {
    try {
        if(data?.length == 0)
            res.status(404).json({message: "No students exist"});
        const result = data?.map(s => ({
            id : s.id,
            fullname : s.fname + " " + s.lname,
            age : s.age,
            gender : s.sex? "male" : "female"
        }));
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

// Get student by Id
studentRouter.get("/detail/:id", async (req, res, next) => {
    try {
        if(isNaN(req.params.id))
            res.status(400).json({message: "Id is not a number"});
        else{
            const result = data?.find(s=>s.id == req.params.id);
            if(result)
                res.status(200).json(result);
            else
                res.status(404).json({message: `Student with id = ${req.params.id} does not exist`})
        }
        
    } catch (error) {
        next(error);
    }
});

// Sort
studentRouter.get("/sort-by-name", async (req, res, next) => {
    try {
        const order = req.query.order;
        
        if(order){
            if(order == "asc"){
                data.sort((a, b) => a.fname.localeCompare(b.fname));
                const result = data?.map(s => ({
                    id : s.id,
                    fullname : s.fname + " " + s.lname,
                    age : s.age,
                    gender : s.sex? "male" : "female"
                }));
                res.status(200).json(result);
            }else if(order == "desc"){
                data.sort((a, b) => b.fname.localeCompare(a.fname));
                const result = data?.map(s => ({
                    id : s.id,
                    fullname : s.fname + " " + s.lname,
                    age : s.age,
                    gender : s.sex? "male" : "female"
                }));
                res.status(200).json(result);
            }
        }else{
            res.status(400).json({message: "Invalid data sort criteria"});
        }
    } catch (error) {
        next(error);
    }
})

module.exports = studentRouter;