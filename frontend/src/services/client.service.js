import axios from 'axios';


const API_URL = 'http://localhost:8080/api/test/clients';

class ClientService {
  

  //The params object will have one, two or all fields: title, page, size.
  getClientsList(params) {
    
    return axios.get(API_URL + 'list', {params});
  }

  update(id, data) {
    return axios.put(API_URL + `${id}`, {data});
  }

  delete(id) {
    return axios.delete(API_URL + `${id}`);
  }
  
}

export default new ClientService();