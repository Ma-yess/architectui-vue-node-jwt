import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  signup(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      adress: user.adress,
      adress2: user.adress2,
      city: user.city,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      phone2: user.phone2,
      zipCode: user.zipCode,
    });
  }
}

export default new AuthService();