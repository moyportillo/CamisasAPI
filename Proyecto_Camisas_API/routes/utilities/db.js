// usr: M0yz3z1996
// pw: igDYS4PnaCv9CDh

const mongoClient = require('mongodb').MongoClient;
let _db;
const userName = process.env.MONGODBUSER; 
const password = process.env.MONGODBPSWD; 
const mongohost = process.env.MONGOHOST;
const mongodb = process.env.MONGODB;
const mongoUri = `mongodb+srv://${userName}:${password}@${mongohost}?retryWrites=true&w=majority`; //Aqui son comillas invertidas simples
const mongoParams = {useUnifiedTopology: true};

//Se agraga aqui para manejar conectado a la basa de datos, si no se conecta no inicia lo demas.
class MongoDB{
    static async getDB(){
        if(!_db){
            try{
                let client = await mongoClient.connect(
                    mongoUri,
                    mongoParams
                );
                _db = client.db(mongodb);
                return _db;
            }catch(err){
                console.log(err);
                throw(ex);
            }
        }else{
            return _db;
        }
    }
}



module.exports = MongoDB;