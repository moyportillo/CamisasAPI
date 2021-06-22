const MongoDB = require('../../utilities/db');
const ObjectId = require('mongodb').ObjectID;

let db;
let camisasColletion;

// se ejecuta cuando se manda a require( este archivo)
(async function(){
    try{
        if(!camisasColletion){
            db = await MongoDB.getDB();
            camisasColletion = db.collection("camisas");
            if(process.env.INSURE_INDEX == 1){
                //vamos a asegurarnos de que exista el indice
    
            }
        }
    }catch(ex){
        console.log(ex);
        process.exit(1);
    }
})(); //funcion que se ejecuta automaticamente

module.exports.getAll = async ()=>{
    try{
        let docsCursor = camisasColletion.find({});
        let rows = await docsCursor.toArray();
        return rows;
    }
    catch(ex){
        console.log(ex);
        throw(ex);
    }   
}

module.exports.getById = async (id)=>{
    try{
        const _id = new ObjectId(id);
        const filter = {_id: _id};
        let row = await camisasColletion.findOne(filter);
        return row;
    }
    catch(ex){
        console.log(ex);
        throw(ex);
    }   
}

module.exports.getByTipo = async (tipo)=>{
    try{
        const filter = {tipo: tipo};
        let cursor = await camisasColletion.find(filter);
        let rows = await cursor.toArray();
        return rows;
    }catch(err){
        console.log(err);
        throw(ex);
    }
}

module.exports.getByVentasMayor = async (ventas)=>{
    try{
        const search = {"$gt": ventas};
        const filter = {ventas: search};
        let cursor = await camisasColletion.find(filter);
        let rows = await  cursor.toArray();
        return rows;
    }catch(err){
        console.log(err);
        throw(err);
    }
}

module.exports.getByVentasMenor = async (ventas)=>{
    try{
        const search = {"$lt": ventas};
        const filter = {ventas: search};
        let cursor = await camisasColletion.find(filter);
        let rows = await  cursor.toArray();
        return rows;
    }catch(err){
        console.log(err);
        throw(err);
    }
}

module.exports.getByVentasRange = async (lower, upper, inclux)=>{
    try{
        const range = (inclux) ? {"$gte":lower, "$lte":upper} : {"$gt":lower, "$lt":upper};
        const filter = {ventas: range};
        let cursor = await camisasColletion.find(filter);
        let rows = await  cursor.toArray();
        return rows;
    }catch(err){
        console.log(err);
        throw(err);
    }
}

module.exports.addOne = async (moda, tipo, precio, venta, user)=>{
    try{
        let newCamisas = {
            moda:moda,
            tipo:tipo,
            precio:precio,
            venta:venta,
            user:user
        };
        let result = await camisasColletion.insertOne(newCamisas);
        return result.ops;
    }catch(ex){
        console.log(ex);
        throw(ex);
    }
}

