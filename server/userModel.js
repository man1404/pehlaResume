const mongoose=require("mongoose")
const bcrypt = require('bcrypt')
const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

newSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.password,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.password = hash;
         next()
     })

    })

})

newSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}


module.exports=mongoose.model("collection",newSchema)