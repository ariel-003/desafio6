import { Msg } from "../class/msgClass.js";
import moment from "moment/moment.js";

const msg = new Msg("./src/data/msg.json")

const get = async (req, res)=>{
    try{
        const jsonMsg = msg.getAll()
        res.send(jsonMsg)
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

const addMsg = async (req, res)=>{
    try{
        let newMsg = req.body
        newMsg = {...newMsg, fyh: moment().format("DD/MM/YYYY HH:mm")}
        if(newMsg){
            const jsonMsg = msg.save(newMsg)
            res.send(jsonMsg)
        }else{
            throw Error("Error al recibir data")
        }
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export { get, addMsg }