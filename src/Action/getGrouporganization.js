/* eslint-disable prettier/prettier */


import axios from 'axios';
import Config from 'react-native-config';

export default (data) => {
    
    let _hedaers = {
        Accept: 'application/json',
        "content-type":"application/json; charset=UTF-8; multipart/form-data",
        'Cache-Control': 'no-cache, no-store, must-revalidate', Pragma: 'no-cache', Expires: 0
    };


    return new Promise((resolve, reject) => {

        var _axios = axios.create();
        
        _axios({
                method: 'get',
                url: Config.API_Service+'/api/grouporganization',
                headers: _hedaers
        }).then(res => {
            resolve({data: [
                {...res.data[0],"Organizations":res.data[0].Organizations.filter(res => parseInt(res.status) == 1)},
                {...res.data[1],"Organizations":res.data[1].Organizations.filter(res => parseInt(res.status) == 1)}
                ]});
        }).catch(ex => {
            console.log(ex);
            reject({ error: ex, state: "getGrouporganization" });
        });

    })
};