import  express from "express";
import dotenv from 'dotenv'
import cors from 'cors';
import roleRouter from './routes/roleRoute.js';
import companyroute from'./routes/companyroute.js';

dotenv.config()
const app = express();

var corOptions = {
  origin: 'http://localhost:80'
}


//middleware
app.use(cors(corOptions));

app.use(express.json())

app.use(express.urlencoded({ extended: true}))


//middlewear function//

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//testing api
app.get("/",(req, res) =>{
  res.json({message:'hello from api'})
})


app.listen (process.env.PORT ,()=>{
    console.log("server listening on port",process.env.PORT);
})



//routes
app.use('/api/roles',roleRouter);
app.use('/api/companies',companyroute)