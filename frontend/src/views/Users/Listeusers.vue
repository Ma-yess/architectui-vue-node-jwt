<template>
    <div>
        
        <div class="app-page-title">
        <div class="page-title-wrapper">
            <div class="search-wrapper " v-bind:class="{ active: searchOpen }">
            <div class="input-holder">
                <input type="text" class="search-input" placeholder="Tapez pour rechercher" v-on:input="handleSearchChange" v-model="searchTitle"/>
                <button class="search-icon" v-on:click="searchOpen = !searchOpen ,page = 1; retrieveUsers(); "><span/></button>
            </div>
            <button class="close" v-on:click="searchOpen = !searchOpen"/>
        </div>
            <div class="page-title-actions">
                <button type="button" class="btn-shadow d-inline-flex align-items-center btn btn-success" @click="$router.push('/signup')">
                    <font-awesome-icon class="mr-2" icon="plus"/>
                    Créer un nouveau
                </button>
            </div>
        </div>
    </div>
        <div  class="mb-2" style="display: flex; align-items: center;">
        Lignes par page:
        <div class="ml-2" >
        <select class="custom-select "  v-model="pageSize" v-on:change="handlePageSizeChange($event)" :key="key">
          <option v-for="size in pageSizes"  :key="size" :value="size">
            {{ size }}
          </option>
        </select>
        </div>
      </div>
        <b-card title="Tous les utilisateurs" class="main-card mb-4">
            <b-table :striped="striped"
                 :bordered="bordered"
                 :outlined="outlined"
                 :small="small"
                 :hover="hover"
                 :dark="dark"
                 :fixed="fixed"
                 :foot-clone="footClone"
                 :items="users"
                 :fields="fields">
                 <template #cell(show_details)="row">
                  <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                  </b-button>

                  <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change
                  <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
                    Details via check
                  </b-form-checkbox> -->
                </template>

                <template #row-details="row">
                  <b-card>
                          <div class="row">
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>First Name:</b></b-col>
                                <b-col>{{ row.item.firstName }}</b-col>
                              </b-row>

                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Last Name:</b></b-col>
                                <b-col>{{ row.item.lastName }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Email Adress:</b></b-col>
                                <b-col>{{ row.item.email }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Téléphone:</b></b-col>
                                <b-col>{{ row.item.phone }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Téléphone2:</b></b-col>
                                <b-col>{{ row.item.phone2 }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Adress:</b></b-col>
                                <b-col>{{ row.item.adress }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Adress 2:</b></b-col>
                                <b-col>{{ row.item.adress2 }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Ville:</b></b-col>
                                <b-col>{{ row.item.city }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Code Pstale:</b></b-col>
                                <b-col>{{ row.item.zipCode }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Role:</b></b-col>
                                <b-col >{{ userRole(row.item.roles) }}</b-col>
                              </b-row>
                          </div>
                          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                          <b-button size="sm" class=" ml-2" @click="deleteUser(row.item.id);">Delete User</b-button>
                          <b-button v-b-modal.modal-no-backdrop @click="successful = false; getUpdated(row.item.id, row.item.username, row.item.email, row.item.firstName, row.item.lastName, row.item.phone, row.item.phone2, row.item.adresse, row.item.adresse2, row.item.city, row.item.zipCode, row.item.roles )" variant="success" size="sm" class=" btn btn-primary ml-2">EDIT</b-button>
                          <b-modal id="modal-no-backdrop" size="lg" v-model="modalShow" hide-backdrop hide-footer >
                            <b-container fluid>
                            <div
                                  v-if="message"
                                  class="alert"
                                  :class="successful ? 'alert-success' : 'alert-danger'"
                              >{{message}}
                          </div>
                            <form name="form" @submit="onSubmit" @reset="onReset" >
                
                                <div class="form-row" style="flex-direction: column;">
                                    <div class="form-row">
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="firstName">Nom d'utilisateur *</label>
                                                <input v-model="form.username" name="username"   type="text" class="form-control">
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div class="form-row " >
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="email">Email *</label>
                                                <input v-model="form.email" name="email"  type="email" class="form-control">
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="form-row">
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="firstName">Prénom *</label>
                                                <input v-model="form.firstName" name="firstName" type="text" class="form-control">
                                                <div
                                                    v-if="submitted && errors.has('firstName')"
                                                    class="alert-danger"
                                                    >{{errors.first('firstName')}}
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="lastName">nom *</label>
                                                <input v-model="form.lastName" name="lastName"  type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div> 
                                    
                                    <div class="form-row">
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="adress">Address</label>
                                                <input v-model="form.adress" name="adress"  type="text" class="form-control">          
                                            </div>
                                        </div>
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="adress2">Address 2</label>
                                                <input v-model="form.adress2" name="adress2"   type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div class="form-row">
                                    <div v-if="!successful" class="col-md-6">
                                        <div class="position-relative form-group">
                                            <label for="city">Ville</label>
                                            <input v-model="form.city" name="city"  type="text" class="form-control">
                                        </div>
                                    </div>
                                    
                                    <div v-if="!successful" class="col-md-6">
                                        <div class="position-relative form-group">
                                            <label for="zipCode">ZipCode</label>
                                            <input v-model="form.zipCode" name="zipCode"  type="text" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="telephone">Téléphone</label>
                                                <input v-model="form.phone" name="telephone"   type="tel" class="form-control">          
                                            </div>
                                        </div>
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="telephone2">Téléphone 2</label>
                                                <input v-model="form.phone2" name="telephone2"   type="tel" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                <b-button v-if="!successful" type="submit" variant="primary">Submit</b-button>
                                <b-button  v-if="!successful" type="reset" variant="danger">Reset</b-button>
                                
                            </form>
                             </b-container>
                            
                          </b-modal>
                  </b-card>
                </template>
            </b-table>
        </b-card>
        
      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
      ></b-pagination>
    </div>
</template>

<script>

import UserService from "../../services/user.service";
import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faStar,
        faPlus
    } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faStar,
        faPlus,
    );

  export default {
    name: 'Listusers',
    components: {
            'font-awesome-icon': FontAwesomeIcon,
        },
    data: () => ({
      
      form: {
          id:"",
          username:"",
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          phone2: "",
          adress: "",
          adress2: "",
          city: "",
          zipCode: "",
          roles: [],
        },
        message:"",
        show: true,
        submitted: false,
        successful: false,
      //userRole:"",
      modalShow: false,
      searchOpen: true,
      searchTitle: "",
      key:"",
      fields: [ "username", "email", 'show_details' ],
      users: [],
      userToUpdate: {},
      currentIndex: -1,

      page: 1,
      count: 0,
      pageSize: 5,

      pageSizes: [5, 10, 15],
      striped: true,
      bordered: true,
      outlined: false,
      small: false,
      hover: true,
      dark: false,
      fixed: false,
      footClone: false
    }),
    
    Computed: {
        
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        
        this.userToUpdate = JSON.stringify(this.form)
        
        this.hundleUpdate(this.form.id, this.userToUpdate)
      },

      hundleUpdate(id, data) {
        
        
      UserService.update(id, data)
        .then(response => {
          alert('heeyy' + response);
          this.message = 'The user was updated successfully!';
          this.successful = true;
          this.submitted = true;
          
          
        })
        .catch(e => {
          throw(e);
          
        });
    },

      onReset(event) {
        event.preventDefault()
        // Reset our form values
      this.form.username = '';
      this.form.email = '';
      this.form.firstName = '';
      this.form.lastName = '';
      this.form.phone = '';
      this.form.phone2 = '';
      this.form.adress = '';
      this.form.adress2 = '';
      this.form.city = '';
      this.form.zipCode = '';
      this.form.roles = '';
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

        getRequestParams(searchTitle, page, pageSize) {
      let params = {};

      if (searchTitle) {
        params["username"] = searchTitle;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    userRole(role) {
          
          if(role == "605885f5126cf2277cb50bf9") {
            return "Administrateur";
          } else if(role == "605885f5126cf2277cb50bf7"){
            return "User";
          } else if(role == "605885f5126cf2277cb50bf8"){
            return "Moderateur";
          } 
        },

    deleteUser(id) {
      const idUser = id;
      alert(idUser)
      UserService.delete(idUser)
        .then(response => {
          alert(response.data);
          this.retrieveUsers();
        })
        .catch(e => {
          throw(e);
        });
    },

    getUpdated(id,username, email, firstName, lastName, phone, phone2, adress, adress2, city, zipCode, roles) {
      this.modalShow = !this.modalShow
      alert(email + '/' + id)
      this.form.id = id;
      this.form.username = username;
      this.form.email = email;
      this.form.firstName = firstName;
      this.form.lastName = lastName;
      this.form.phone = phone;
      this.form.phone2 = phone2;
      this.form.adress = adress;
      this.form.adress2 = adress2;
      this.form.city = city;
      this.form.zipCode = zipCode;
      this.form.roles = roles;
    },
    

    retrieveUsers() {
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      );
      this.message = '';
      UserService.getUsersList(params)
        .then((response) => {
          const { users, totalItems } = response.data;
          this.users = users;
          this.count = totalItems;
          this.userRole
        })
        .catch((e) => {
          throw e ;
         // console.log(e);
        });
    },
    
    handlePageChange(value) {
      this.page = value;
      this.retrieveUsers();
    },
    
    handleSearchChange() {
      this.retrieveUsers();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveUsers();
    },

    },
    mounted() {
      this.retrieveUsers();
    }
  }
</script>
