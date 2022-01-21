const express = require ("express")
const cors = require ("cors")
const mongoose = require ("mongoose")

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb+srv://admin:admin@cluster0.bke58.mongodb.net/Users?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.put('/user/update/:id',(req,res)=>{

    User.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,user)=>{
            if(err){
                return res.status(400).json({error:err});
            }

             return res.status(200).json({
                success:"Updated SuccessFull!"
            });
        });
});

app.listen(8000,() => {
    console.log("BE started at port 8000")
})