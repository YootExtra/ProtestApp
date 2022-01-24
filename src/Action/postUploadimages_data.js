/* eslint-disable prettier/prettier */

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

        axios.post(Config.API_Service+'/api/uploadimages_data',req).then(res => {
            resolve(res);
        }).catch(ex => {
            console.log(ex);
            reject({ error: ex, state: "uploadimages_data" });
        });

    })
};