const { default: mongoose } = require('mongoose')
const {isEmail} = require('validator')
const connect = require('mongoose').connect
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const { reset } = require('nodemon');
const Schema = mongoose.Schema;


const userSchema = new Schema ({
    email:{
        type: String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true,'Please enter a password'],
        minlength:[6,'Minimum password length is 6 characters']
    },
    role:{
        type: String,
        enum :['user','admin'], 
        default: 'user'
    }, 
    passwordChangedAt:Date,
    passwordResetToken: String,
    passwordResetTokenExpires:Date
},{timestamps:true})

//fire a function after doc saved to db
// userSchema.post('save',function(doc,next){
//     console.log('new user was created & saved',doc)
//     next();
// })
// //hasing the user password
userSchema.pre('save',async function(next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password,salt)
    next();
});

const User = mongoose.model('User',userSchema)
module.exports = User;
