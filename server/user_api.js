// all request under /api/users

import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const url = "https://dummyapi.io/data/v1/user?limit=50";
const app_id = "62503de661f4fc36cb48ed8b";
var loaded_user = null;
var loaded = false;

router.get('/', (req, res) => {
    // fetch from dummyapi
    if(!loaded){ // fetch once only
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'app-id': app_id,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then( res => { return res.json()
        }).then( data_json => {
            loaded_user = data_json
            loaded=true
            res.json(loaded_user)
        }).catch( err => { console.log(err) })
    }else{ //fetch from memory
        res.json(loaded_user)
    }
    
});

router.delete('/:id',function( req, res){
    // did not keep a list of deleted user_id, instead, keep a list of loaded_user
    // do this because, suspect the chance that dummyapi might send a different set of user
    loaded_user.data = loaded_user.data.filter( (user, _) => {
        return (user.id !== req.params.id)
    })
    res.json({message:'DELETE Success'})
});

export default router;