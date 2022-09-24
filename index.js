const cookieParser = require("cookie-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const auth = require("./routes/auth")
const post = require("./routes/post")
const appoin = require("./routes/appoinment")


const app = express()
// connect to db
mongoose.connect(
    'mongodb+srv://Alan:alan1234@cluster0.jdx9yh4.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true},
() => console.log("connected to db"));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", auth);
app.use("/posts", post);
app.use("/app", appoin);

app.set("views","./routes/views")
app.set("view engine","ejs")

app.get("/",(req,res) =>{
    res.send("working")
})


app.listen(5000, () =>{
    console.log("running on port 5000!")
})