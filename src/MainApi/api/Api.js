import Config from "react-native-config";

import { httpClient } from './HttpAPI'


async function API(name, opt, endpoint) {
    const requireEndpoint = endpoint[name]
    let config = {}
    //console.log("requireEndpoint",requireEndpoint);

    const header = await getHeader(requireEndpoint)

    config = {
        method: requireEndpoint.method,
        baseURL: requireEndpoint.baseURL,
        redirect: true,
        url: setURLApi(requireEndpoint, opt),
        headers: header,
        data: opt?.data || null,
        direct: requireEndpoint.direct || null,
    }

    if (requireEndpoint.method.toUpperCase() === "GET") {
        config["params"] = opt?.params
    }

    if (requireEndpoint.new) {
        config["new"] = requireEndpoint.new
    }

    if (requireEndpoint.multipart) {
        config["headers"] = {
            'accept': 'application/json',
            'Content-Type': `multipart/form-data`
        }
    }


    if (requireEndpoint.imagebase64) {
        config["headers"] = {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Content-Type': 'application/json',
        }

    }

    return await httpClient(config);


}

async function getHeader(requireEndpoint) {
    let header

    header = {
        "Content-Type": "application/json",
    }


    return header
}

function setURLApi(requireEndpoint, opt) {
    let url = requireEndpoint.url
    if (opt?.path) {
        requireEndpoint.paths.forEach((v, i) => {
            url = url.replace(":" + v, opt?.path[v]);
        })
    }

    return url
}

export default API
