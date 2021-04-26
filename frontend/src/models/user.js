export default class User {
    constructor(username, email, password, firstName, lastName, phone, phone2, adresse, adresse2, city, zipCode, roles) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.phone = phone;
      this.phone2 = phone2;
      this.adresse = adresse;
      this.adresse2 = adresse2;
      this.city = city;
      this.zipCode = zipCode;
      this.roles = roles;
    }
  }