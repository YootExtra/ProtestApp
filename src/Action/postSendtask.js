/* eslint-disable prettier/prettier */
// import { api } from "../lib";



// export default (req) => {
//     return new Promise((resolve, reject) => {
//         api("sendtask", {
//             data: req
//         }).then(result => {
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

        axios.post(Config.API_Service+'/api/sendtask',req).then(res => {
            resolve(res);
        }).catch(ex => {
            console.log(ex);
            reject({ error: ex, state: "sendtask" });
        });
        
        // _axios({
        //         method: 'post',
        //         url: 'https://103.30.124.82:5678/api/sendtask',
        //         data: req,
        //         headers: _hedaers
        // }).then(res => {
        //     resolve(res);
        // }).catch(ex => {
        //     console.log(ex);
        //     reject({ error: ex, state: "sendtask" });
        // });

    })
};