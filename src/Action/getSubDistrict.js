
import axios from 'axios';
import Config from 'react-native-config';

export default (req) => {
  let _hedaers = {
    Accept: 'application/json',
    'content-type': 'application/json; charset=UTF-8; multipart/form-data',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0,
  };

  return new Promise((resolve, reject) => {
    var _axios = axios.create();

    _axios({
      method: 'get',
      url: 'https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/'+req.p+'/district/'+req.d,
      headers: _hedaers,
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(ex => {
        console.log(ex);
        reject({error: ex, state: 'getDistrict'});
      });
  });
};
