const cookieParser = require("cookie-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const auth = require("./routes/auth")
const post = require("./routes/post")
const bookDate = require("./routes/availableDate");
const admin = require("./routes/admin")


const app = express()
// connect to db
mongoose.connect(
    'mongodb+srv://Alan:alan1234@cluster0.jdx9yh4.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true},
() => console.log("Look Up"));
mongoose.connection.on("disconnected",() =>{
    console.log("mongoDB Disconnected")
});
mongoose.connection.on("connected",() =>{
    console.log("mongoDB Connected")
});


app.use(express.json());
app.use(cookieParser());

app.use("/auth", auth);
app.use("/posts", post);
app.use("/session", bookDate);
app.use("/admin", admin);

app.set("views","./routes/views")
app.set("view engine","ejs")

app.get("/",(req,res) =>{
    res.send("working")
})


app.listen(5000, () =>{
    console.log("running on port 5000!")
})