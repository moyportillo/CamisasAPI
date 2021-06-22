const express = require('express');
const router = express.Router();

const CamisaMongoRoute = require('./camisas');

router.use("/camisas", CamisaMongoRoute);



module.exports = router;