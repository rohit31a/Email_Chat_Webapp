const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://Rohitsr45:Rohit525@cluster0.d5ipsor.mongodb.net/Cluster0?retryWrites=true&w=majority")
.then(()=>{
    console.log("mongodb connected");
}).catch(()=>{
    console.log('failed');
})

const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection