import axios from 'axios';


const API_URL = 'http://localhost:8080/api/test/client/';

class ClientService {
  

  //The params object will have one, two or all fields: title, page, size.
  getClientsList(params) {
    
    return axios.get(API_URL + 'list', {params});
  }

  updateClient(id, data) {
    return axios.put(API_URL + `${id}`, {data});
  }

  deleteClient(id) {
    return axios.delete(API_URL + `${id}`);
  }
  
}

export default new ClientService();