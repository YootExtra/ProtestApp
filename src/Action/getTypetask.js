
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
                url: Config.API_Service+'/api/groupitem?id='+data,
                headers: _hedaers
        }).then(res => {
            resolve(res);
        }).catch(ex => {
            console.log(ex);
            reject({ error: ex, state: "getTypetask" });
        });

    })
};