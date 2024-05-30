import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import flash from 'connect-flash';
import path from 'path';
import Swal from 'sweetalert2'
import methodOverride from 'method-override'
import bodyParser from 'body-parser';
import { mongooseConnection } from './config/mongoose.config.js';
import homeRouter from './route/homeroute.js';


const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'view'));
app.use(ejsLayouts);
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up session & flash
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 100
    }
}))

app.use(flash());



//defining routes
app.use('/', homeRouter)


//initiating server
app.listen(3000, () => {
    console.log("server running on port 3000");
    mongooseConnection();
})