import Config from "react-native-config";

import { API } from '../MainApi'

const endpointMain = {
    "postLoginmobile": { baseURL: Config.API_Service, url: `/api/loginmobile`, method: "POST" },
    "putUpdatedevice": { baseURL: Config.API_Service, url: `/api/updatedevice`, method: "POST"},
    "getTypetask": { baseURL: Config.API_Service, url: `/api/typetask`, method: "GET"},
    "getGroupTypetask": { baseURL: Config.API_Service, url: `/api/typetaskgroup2`, method: "GET"},
    "postGroupTypetask": { baseURL: Config.API_Service, url: `/api/grouptype`, method: "POST"},
    "sendtask": { baseURL: Config.API_Service, url: `/api/sendtask`, method: "POST"},
}

export default (name, opt) => API(name, opt, endpointMain) 