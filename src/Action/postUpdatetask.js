/* eslint-disable prettier/prettier */

import axios from 'axios';
import Config from 'react-native-config';

export default (req) => {

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

        axios.post(Config.API_Service+'/api/sendratingtask',req).then(res => {
            resolve(res);
        }).catch(ex => {
            console.log(ex);
            reject({ error: ex, state: "sendratingtask" });
        });

    })
};