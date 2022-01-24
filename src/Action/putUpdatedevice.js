/* eslint-disable prettier/prettier */

// import { api } from "../lib";



// export default (req) => {
//     return new Promise((resolve, reject) => {
//         api("putUpdatedevice", {
//             data: req
//         })
//             .then(result => {
//                 console.log(result);
//                 resolve(result.data);
//             }).catch(ex => {
//                 console.log("ex", ex);
//                 reject({ error: ex, state: "putUpdatedevice" });
//             });
//     })
// };


import axios from 'axios';
import Config from 'react-native-config';

export default (req) => {
    
    let _hedaers = {
        Accept: 'application/json',
        "content-type":"application/json; charset=UTF-8; multipart/form-data",
        'Cache-Control': 'no-cache, no-store, must-revalidate', Pragma: 'no-cache', Expires: 0
    };


    return new Promise((resolve, reject) => {

        axios.post(Config.API_Service+'/api/updatedevice',req).then(res => {
            resolve(res);
        }).catch(ex => {
            console.log(ex);
            reject({ error: ex, state: "Update userinfo" });
        });
    })
};