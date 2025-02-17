// const mongoose = require('mongoose')
// const crypto = require('crypto')

// //schema
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         trim: true,
//         required: true,
//         lowercase: true
//     },
//     name:{
//         type:String,
//         trim : true,
//         required: true
//     },
//     hashed_password:{
//         type: String,
//         trim: true,
//         required: true
//     },
//     salt: String,
//     role: {
//         type:String,
//         default:'Normal'
//     },
//     resetPasswordLink:{
//         data: String,
//         default: ''
//     }
// },{timeStamp: true})

// userSchema.virtual('password').set(function(password){
//         this.password = password
//         this.salt = this.makeSalt()
//         this.hashed_password = this.encryptPassword(password)
//     }).get(function() {
//         return this._password
//     })

//     userSchema.methods = {
//         makeSalt: function(){
//             return Math.round(new Date().valueOf()*Math.random())+ ''
//         },
//         encryptPassword: function(password){
//             if(!password) return ''
//             try{
//                 return crypto
//                     .createHmac('sha1',this.salt)
//                     .update(password)
//                     .digest('hex')
//             }catch(err){
//                 return ''
//             }
//         },
//         authenticate: function(plainpassword){
//             return this.encryptPassword(plainpassword)===this.hashed_password
//         }

//     }
//     module.exports = mongoose.model('User',userSchema)


const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: String,
      default: 'patient'
    },
    resetPasswordLink: {
      data: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// virtual
userSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

module.exports = mongoose.model('User', userSchema);