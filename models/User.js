const mongoose = require("mongoose");
const schema = mongoose.Schema;
const UserSchema = new schema({
    name:{
        type : String,
        required: true,
        
    },
    lastName:{
        type : String,
        required: true,
    },

    email:{
        type : String,
        required: true,
    },
    password:{
        type : String,
        required: true,
    },
    isAdmin:{
        type : Boolean,
        default: false,
    },
})
module.exports = User = mongoose.model("user", UserSchema);