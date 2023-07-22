const { default: mongoose } = require('mongoose')
const {isEmail} = require('validator')
const {isStrongPassword} = require('validator')
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
        trim:true,
        validate:[isEmail,'Please enter a valid email']
        
    },
     isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
  },
   expiresAt: {
      type: Date,
      default: null,
    },
 password: {
    type: String,
    required: [true, 'Please enter a password'],
    minLength: [8,'Password must be at least 8 characters long'], // Minimum length of 8 characters
    validate: {
        validator: function (value) {
        return isStrongPassword(value, {
            minLowercase: 1, // At least 1 lowercase letter
            minUppercase: 1, // At least 1 uppercase letter
            minNumbers: 1, // At least 1 number
      });
    },
    message: 'Please enter a valid password. Password must contain uppercase,lowercase,numbers and a symbol',
  },
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
