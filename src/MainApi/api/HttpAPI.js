/* eslint-disable prettier/prettier */
import axios from 'axios'
import Config from "react-native-config";

const getNewAxios = axios.create();


getNewAxios.interceptors.response.use((response) => {
    
    return response;
});

getNewAxios.interceptors.request.use(async (config) => {

    config.withCredentials = true

    if (config.method == 'get') {
        //config.data = {};
        const newBody = JSON.parse(JSON.stringify(config));
        delete newBody.transformRequest;
        delete newBody.transformResponse;
        delete newBody.direct;
        const data = JSON.parse(JSON.stringify(newBody));
        config.baseURL = Config.API_Service+config.url;
        config.url = "";
        config.method = "get";
        // config.data = data
        config.params = null;
        console.log(config);

        return config;
    } else {
        if (config.headers["accept"] !=="application/json" &&config.headers["Content-Type"] !=="multipart/form-data" ) {
            const newBody = JSON.parse(JSON.stringify(config));
            delete newBody.transformRequest;
            delete newBody.transformResponse;
            delete newBody.direct;
            console.log("newBody",newBody);
            // const data = JSON.parse(JSON.stringify(newBody));
    
            config.baseURL = Config.API_Service;
            // config.url = "api";
            config.method = "post";
            // config.data = data
            config.params = null;
        }
    
        return config;
    }

    
});


export const httpClient = getNewAxios
