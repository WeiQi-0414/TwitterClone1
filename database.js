const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);


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