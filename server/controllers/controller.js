const {ElectronicsModel, HomeFurnitureModel, ClothingFashionModel, CarsPartsModels, AccessoriesModel, FoodBeverageModel, SelfCareModel, CartModel} = require("../models/product")
const { requestData } = require("./shareCode")
const { request_product_category_handler } = require("./sub_controller")


const get_all_electronics = async (req, res, next) => {
    try {
        await requestData(req, res, ElectronicsModel)
    } catch (error) {
        next(error)
    }
}

const get_all_home_furniture = async (req, res, next) => {
    try {
        await requestData(req, res, HomeFurnitureModel)
    } catch (error) {
        next(error)
    }
}

const get_all_clothing_fashion = async (req, res, next) => {
    try {
        await requestData(req, res, ClothingFashionModel)
    } catch (error) {
        next(error)
    }
}

const get_single_product = async (req, res, next) => {
    try {
        const get_product_electronic = await ElectronicsModel.find({_id: {$in: req.params.id}})
        if (get_product_electronic.length > 0) {
            return res.status(200).json({
                single: get_product_electronic
            })
        }
        const get_product_home = await HomeFurnitureModel.find({_id: {$in: req.params.id}})
        if (get_product_home.length > 0) {
            return res.status(200).json({
                single: get_product_home
            })
        }
        const get_product_clothing = await ClothingFashionModel.find({_id: {$in: req.params.id}})
        if (get_product_clothing.length > 0) {
            return res.status(200).json({
                single: get_product_clothing
            })
        }
        const get_product_accessories = await AccessoriesModel.find({_id: {$in: req.params.id}})
        if (get_product_accessories.length > 0) {
            return res.status(200).json({
                single: get_product_accessories
            })
        }
        const get_product_food = await FoodBeverageModel.find({_id: {$in: req.params.id}})
        if (get_product_food.length > 0) {
            return res.status(200).json({
                single: get_product_food
            })
        }
        const get_product_cars = await CarsPartsModels.find({_id: {$in: req.params.id}})
        if (get_product_cars.length > 0) {
            return res.status(200).json({
                single: get_product_cars
            })
        }
        const get_product_care = await SelfCareModel.find({_id: {$in: req.params.id}})
        if (get_product_care.length > 0) {
            return res.status(200).json({
                single: get_product_care
            })
        }
        console.log(get_all_electronics)
        
    } catch (error) {
        next(error)
    }
}

const get_products_by_category = async (req, res, next) => {
    try {
        const ModelArray = [
            ElectronicsModel, HomeFurnitureModel, ClothingFashionModel, CarsPartsModels, AccessoriesModel, FoodBeverageModel, SelfCareModel
        ]

        for (let i = 0; i  < ModelArray.length; i++) {
                const get_product_by_cat = await ModelArray[i].find({}).where("category").equals(req.params.cat).limit(1)
                if (get_product_by_cat.length > 0) {
                    return await request_product_category_handler(req, res, ModelArray[i])
                } else {
                    continue
                }
        }
    } catch (error) {
        next(error)
    }
}

const get_electronic_landing = async (req, res, next) => {
    try {
        const request_electronic = await ElectronicsModel.find({}).limit(8)
        res.status(200).send(request_electronic)
    } catch (error) {
        next(error)
    }
}

const get_home_landing = async (req, res, next) => {
    try {
        const request_home_furniture = await HomeFurnitureModel.find({}).limit(8)
        res.status(200).send(request_home_furniture)
    } catch (error) {
        next(error)
    }
}

const get_clothing_landing = async (req, res, next) => {
    try {
        const request_clothing = await ClothingFashionModel.find({}).limit(8)
        res.status(200).send(request_clothing)
    } catch (error) {
        next(error)
    }
}

const get_cart_produtcs = async (req, res, next) => {
    try {
        const skip = ((req.query.page - 1) * 8)
        const products = await CartModel.find({}).limit(8).skip(skip)
        const count_products = await CartModel.find().countDocuments()
        res.status(200).send({
            products,
            numberOfDocuments: count_products
        })
    } catch (error) {
        next(error)
    }
}

const add_cart_product = async (req, res, next) => {
    try {
        const new_cart_product = new CartModel(req.body) 
        await new_cart_product.save()
        res.status(200).send("it works.")
    } catch (error) {
        next(error)
    }
}

const clear_cart_products = async (req, res, next) => {
    try {
        await CartModel.deleteMany()
        res.status(200).send("Cart cleared")
    } catch (error) {
        next(error)
    }
}

const delete_matching_cart_product = async (req, res, next) => {
    try {
        await CartModel.deleteOne({_id: {$in: req.params.id}})
        res.status(200).send("Product removed")
    } catch (error) {
        next(error)
    }
}

module.exports = {add_cart_product, clear_cart_products, delete_matching_cart_product, get_cart_produtcs, get_all_electronics, get_electronic_landing, get_home_landing, get_clothing_landing, get_products_by_category, get_single_product, get_all_clothing_fashion, get_all_home_furniture}