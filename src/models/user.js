const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('not valid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain "password"')
            }

        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    },
    sockets:[{
        socketid:{
            type:String
        }
    }]

},{
    timestamps:true
})

userSchema.methods.toJSON=function(){
    const user=this
    const userobject=user.toObject()
    delete userobject.password
    delete userobject.tokens
    return userobject
}


userSchema.methods.generateAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET||'vitposterbypranay')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}


userSchema.statics.findByCredentials=async (email,password)=>{
    const user =await User.findOne({email})
    if(!user){
        throw new Error('unable to login')
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
    return user
}

userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)

    }
    next()
})

const User=mongoose.model('User',userSchema)
module.exports=User;