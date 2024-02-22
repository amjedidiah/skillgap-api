const mongoose = require('mongoose');
const crypto = require("crypto");
const generateRandomIntegers = require('../utils/generateRandomIntegers');



const userSchema = mongoose.Schema({
    firstName: {
        type: String,
         required: true,
        },
    userName: {
            type: String,
             required: true,
             unique: true,
            },
   skillGapTag: {
              type: String,
               required: true,
               unique: true,
              },
    lastName: {
            type: String,
            required: true,
            },
    email: {
        type: String,
         required: true,
          unique: true
        },
    region: {
            type: String,
             required: true,
            },
    phoneNumber: {
                type: String,
                 required: true
                },
    password: {
        type: String, 
        required: true
    },
    
    transferPin: {
        type: Number, 
        required: false
    },
    
    profilePic: {
        type: Object,
        required: true,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    accountVerificationToken: { type: String, default: null },
    accountVerificationTokenExpires: { type: Date, default: null },
    passwordRestToken: { type: String, default: null },
    passwordResetTokenExpires: { type: Date, default: null },
    passwordChangeActivation: { type: Boolean, default: false },
    
    twitter: {
        type: String,
          default: null
        },
     tiktok: {
            type: String, 
              default: null
            },
    facebook: {
                type: String,
                  default: null
                },
    youtube:{
        type: String,
         unique: true,
    },
    isEmailVerified:{
    type: Boolean,
    default: false
    },
    totalEarnings: { type: Number, default: 0 },
    
    
}, {timestamps: true})


userSchema.methods.generateEmailVerificationToken = function () {
  // creating a token for the  accountVerificationToken
  emailToken = crypto.randomBytes(20).toString("hex");
  this.accountVerificationToken = crypto.createHash("sha256").update(emailToken).digest("hex");

  // create a date for the token to expire
  this.accountVerificationTokenExpires = Date.now() + 20 * 60 * 1000 // expires in 20 minutes

  return emailToken
}

userSchema.methods.generatePasswordUpdate = function(){
  

   // generate six random integers
   const randomNumber = generateRandomIntegers(1, 1000000, 800000)

   console.log("this is the random number", randomNumber)

 
   
  this.passwordRestToken = randomNumber.toString() ;
 
  this.passwordResetTokenExpires = Date.now() + 20 * 60 * 1000 // expires in 20 minutes
  
   return randomNumber.toString()
}



const UserModel = mongoose.model("userReg", userSchema)

module.exports = UserModel