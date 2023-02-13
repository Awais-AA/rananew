
const express=require('express');
const cors = require('cors');
const usersRouter = require('./routes/users-routes.js');
const authRouter = require('./routes/auth-routes.js');
const dotenv = require('dotenv');
const cookieParser =require('cookie-parser');
const packageRoute = require('./routes/PackagesRoutes.js');
const userProfile = require('./routes/ProfileEdit.js');
const attributeValue = require('./routes/Attributes.js')
const corsOptions =require('./config/corsOptions')
const credentials=require("./middleware/credentials")
dotenv.config();



const app = express();
const PORT = process.env.PORT || 8000;

app.use(credentials)
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRouter);
app.use('/api/', usersRouter);
app.use('/api/',usersRouter);
app.use('/api/', packageRoute);
app.use('/api/',userProfile)
app.use('/api/',attributeValue)

app.listen(PORT, ()=> {
  console.log(`Server is listening on port:${PORT}`);
})