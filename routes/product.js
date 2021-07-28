const express = require("express");
const router = express.Router();
const Product = require("../models/Product")

//Get a list of all product
router.get('/', async (req,res,next) => {
    try{

        // const results = await Product.find();
        //bech na7i hakel __V eli to5rejli fel base mta3 le pdt (l partie haki prijection)
        const results = await Product.find({}, {__v : 0});
        //hethi bech t5ali lesm affiché wel id tna7a 
        //const results = await Product.find({}, {name : 1, __id:0});
        //taw partie l query zay cdt ta3mli tafichili kan eli 3lih l cdt
        //const results = await Product.find({price: 3999}, {});


        res.send(results);


    }catch(error){
        console.log(error.message)
    }
});

//create a new product
router.post('/', async (req,res,next) => {

    try{
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);

    }catch(error){
        console.log(error.message);
         
        //if the price or name not existt
        if(error.message === 'validationError'){
            return res.status(422).send(error.message);
        }
        // if(!searchedProduct){
        //     return res.status(422).send({msg: "price is required"});
        // }


    }
})
//use the first or this under is the same but the first is clear
//     console.log(req.body);
//     const product = new Product({
//         name: req.body.name,
//         price: req.body.price
//     })
//     product.save()
//     .then(result => {
//         console.log(result);
//         res.send(result)
//     })
//     .catch(err => {
//         console.log(err.message)
//     })
// });

//get a product by id
router.get('/:id', async (req,res,next) => {
    const id = req.params.id;
    try{
        const product = await Product.findById(id)
        if (!product){
            return res.status(404).send({msg: 'product does not exist'})
        }
        // res.send(product);

    }catch(error){
        console.log(error.message);
        res.status(400).send({ msg: "Invalid product id"});
        // next(error);


    }
});
//update a product by id
router.put('/:id', async (req,res,next) => {
    try{
        const id = req.params.id;
        const updates = req.body;
        const options = {new:true}
        const result = await Product.findByIdAndUpdate(id,updates,options)
        if(!result){
            return res.status(404).send({msg: 'product does not exist'})

        }
        // res.send(result)
    }catch(error){
        console.log(error.message);
        res.status(400).send({ msg: "Invalid product id"});

    }
});
//delete a product by id
router.delete('/:id',async (req,res,next) => {
    const id = req.params.id;
    try{
        const result = await Product.findByIdAndDelete(id);
        // res.send(result);
        if (!result){
            return res.status(404).send({msg: 'product does not exist'})
        }
    }catch(error){
        console.log(error.message)
        res.status(400).send({ msg: "Invalid product id"});

    }
});


module.exports = router;