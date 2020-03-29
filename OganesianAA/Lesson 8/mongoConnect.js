const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

class mongoConnect{
    constructor(){
        this.connection = mongoose.connect('mongodb://localhost:27017/NodeJS', { useNewUrlParser: true } );
        this.connect();
    }
    connect(){
        this.connection
            .then((result)=>{
                console.log('connection successful mongodb');
            })
            .catch(err=>{
                console.log(err);
            });
    }
}
module.exports = mongoConnect;