
import { api } from "../lib";

export default (req) => {
    return new Promise((resolve, reject) => {
        api("postGroupTypetask", {
            data: {
                uuid: ""
            }
        })
            .then(result => {
                console.log(result);
                resolve(result.data);
            }).catch(ex => {
                console.log("ex", ex);
                reject({ error: ex, state: "postGroupTypetask" });
            });
    })
};

