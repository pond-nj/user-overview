import express from 'express';
import cors from 'cors';
import user_api from'./user_api.js'

const app = express();
const port = 3001;

const whitelist = ["http://localhost:3000","http://127.0.0.1:3000"]
// set up cors config
const corsOption = {
    origin: function (origin, callback) {
        if( !origin || whitelist.indexOf(origin) !== -1 ) callback(null, true)
        else callback( new Error("not allowed by cors"))
    }
}
app.use(cors(corsOption))

// use module user_api
app.use('/api/users', user_api);
app.listen( port, function() {
    console.log( `Listening on port ${port}` );
});