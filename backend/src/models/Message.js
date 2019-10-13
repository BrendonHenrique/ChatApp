const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MessageSchema = new mongoose.Schema({

    author:{
        type: String, 
        required: true
    },

    message:{
        type: String,
        required: true
    },

    createdAt:{
        type: Date, 
        default: Date.now
    }

});

MessageSchema.plugin(mongoosePaginate);

mongoose.model('Messages', MessageSchema);