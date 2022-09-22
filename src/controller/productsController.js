import { Products } from "../class/productsClass.js"

const products = new Products()

const get = async (req, res)=>{
    try{
        const jsonProducts = await products.get()
        res.send(jsonProducts)
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}
const getById = async (req, res)=>{
    try{
        const product = await products.getById(req.params.id)
        if(product){
            res.status(200).json(product)
        }else{
            throw Error("producto no disponible")
        }
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}
const addProduct = async (req, res)=>{
    try{
        const product = req.body
        if(product){
            const newProducts = await products.addProduct(product)
            res.send(newProducts)
        }else{
            throw Error("Error al recibir data")
        }
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}
const setProduct = async (req, res)=>{
    try{
        const product = req.body
        const id = req.params.id
        if(product && id){
            await products.setProduct(product, id)
            res.status(200).send(`Producto actualizado con id: ${id}`)
        }else{
            throw Error("Error al recibir data")
        }
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}
const delProduct = async (req, res)=>{
    try{
        const id = req.params.id
        await products.delProduct(id)
        res.status(200).send(`Producto eliminado con id: ${id}`)
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export { get, getById, addProduct, setProduct, delProduct }