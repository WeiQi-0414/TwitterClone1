const mongoose = require("mongoose");

class Database{
    constructor(){
        this.connect();
    }

    connect(){
        mongoose.connect("mongodb+srv://admin:123qwe@twitterclonecluster.dkb6aqz.mongodb.net/?retryWrites=true&w=majority")
        .then(()=> {
            console.log("DB connection works");
        })
        .catch((err)=> {
            console.log("DB connection fails" + err);
        })

    }
}

module.exports = new Database();