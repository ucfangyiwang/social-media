const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

mongoose.set('strictQuery',false);
mongoose.connect(process.env.DATABASE_LOCAL,
    {useNewUrlParser: true, 
    useCreateIndex:true,
    useFindAndModify:false,
    strictQuery:false},()=>{
    console.log("Connected to MongoDB")
})


app.use(express.json())
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", () => userRoute)
app.use("/api/auth",  () => authRoute)
app.use("/api/post",  () => postRoute)

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`backend is running on port ${port} `)                                              
})