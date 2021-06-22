const express = require('express');
const router = express.Router();
const {getAll, addOne, getById, getByTipo, getByVentasMayor, getByVentasMenor, getByVentasRange} = require('./camisas.model');

router.get("/",
async (req, res)=>{
    try{
        let rows =  await getAll();
        res.status(200).json(rows);
    }catch(ex){
        res.status(500).json({"msg":"Error"});
    }
});

router.get(
    "/byid/:id",
async (req, res)=>{
    try{
        let {id} = req.params;
        let row = await getById(id);
        res.status(200).json(row);
    }catch(ex){
        res.status(500).json({"msg":"Error"});
    }
});

router.get(
    "/bytipo/:tipo",
async (req, res)=>{
    try{
        let {tipo} = req.params;
        let rows = await getByTipo(tipo);
        res.status(200).json(rows);
    }catch(ex){
        res.status(500).json({"msg":"Error"});
    }
});

router.get(
    "/byventas/mayor/:ventas",
async (req, res)=>{
    try{
        let {ventas} = req.params;
        let _ventas = parseInt(ventas);
        let rows = await getByVentasMayor(_ventas);
        res.status(200).json(rows);
    }catch(ex){
        res.status(500).json({"msg":"Error"});
    }
});

router.get(
    "/byventas/menor/:ventas",
async (req, res)=>{
    try{
        let {ventas} = req.params;
        let _ventas = parseInt(ventas);
        let rows = await getByVentasMenor(_ventas);
        res.status(200).json(rows);
    }catch(ex){
        res.status(500).json({"msg":"Error"});
    }
});

router.get(
    "/byventas/range/:low/:up/:ex",
async (req, res)=>{
    try{
        let {low, up, ex} = req.params;
        let _low = parseInt(low);
        let _up = parseInt(up);
        let _ex = parseInt(ex) && true;
        let rows = await getByVentasRange(_low, _up, _ex);
        res.status(200).json(rows);
    }catch(ex){
        res.status(500).json({"msg":"Error"});
    }
});

router.post(
    "/new",
    async (req, res)=>{
        try{
            let {moda, tipo, precio, venta} = req.body;
            let docInserted = await addOne(moda, tipo, precio, venta, 'Moises');
            res.status(200).json(docInserted);
        }catch(ex){
            res.status(500).json({"msg":"Error"});
        }
    }
);



module.exports = router;