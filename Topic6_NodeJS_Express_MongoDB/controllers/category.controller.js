const db = require("../models");

async function getAll(req, res){
    try {
        const categories = await db.Categories.find({}).exec();
        const newResult = categories?.map(c => ({
            code: c._id,
            description: c.description
        }));

        if(categories){
            res.status(200).json({
                message: "List of Categories",
                data: newResult
            });
        }
    } catch (error) {
        next(error);
    }
}

const CategoryController = {
    getAll,
};

module.exports = CategoryController;