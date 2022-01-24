/* eslint-disable prettier/prettier */
// import { api } from "../lib";



// export default (req) => {
//     return new Promise((resolve, reject) => {
//         api("postLoginmobile", {
//             data: {
//                 cid: req.cid,
//                 uuid: req.uuid
//             }
//         })
//             .then(result => {
//                 console.log(result);
//                 resolve(result.data);
//             }).catch(ex => {
//                 console.log("ex", ex);
//                 reject({ error: ex, state: "postLoginmobile" });
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
    let Url = Config.API_Service+'/api/loginmobile';
    console.log(Url);
    return new Promise((resolve, reject) => {

        var _axios = axios.create();

        _axios.interceptors.response.use((response) => {
            console.log(response);
            return response;
        });
    
        _axios.interceptors.request.use((body) => {
            console.log(body.data);
            return body;
        });

        axios.post(Url,{
            cid: req.cid,
            uuid: req.uuid
        },{
            headers: _hedaers
          }).then(res => {
            resolve(res);
        }).catch(ex => {
            console.log(ex);
            reject({ error: ex, state: "Login" });
        });
    })
};