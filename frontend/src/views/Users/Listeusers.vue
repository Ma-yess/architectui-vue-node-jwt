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
                          <b-button v-b-modal.modal-no-backdrop @click="modalShow = !modalShow" variant="success" size="sm" class=" btn btn-primary ml-2">EDIT</b-button>
                          <b-modal id="modal-no-backdrop" size="lg" v-model="modalShow" hide-backdrop  >
                            <b-container fluid>
                            <b-form @submit="onSubmit" @reset="onReset" >
                              <b-form-group
                                id="input-group-1"
                                label="Email address:"
                                label-for="input-1"
                                description="We'll never share your email with anyone else."
                              >
                                <b-form-input
                                  id="input-1"
                                  v-model="form.email"
                                  type="email"
                                  placeholder="Enter email"
                                  required
                                ></b-form-input>
                              </b-form-group>

                              <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                                <b-form-input
                                  id="input-2"
                                  v-model="form.name"
                                  placeholder="Enter name"
                                  required
                                ></b-form-input>
                              </b-form-group>

                              <b-form-group id="input-group-3" label="Food:" label-for="input-3">
                                <b-form-select
                                  id="input-3"
                                  v-model="form.users"
                                  :options="users"
                                  required
                                ></b-form-select>
                              </b-form-group>
                           
                              

                              <b-button type="submit" variant="primary">Submit</b-button>
                              <b-button type="reset" variant="danger">Reset</b-button>
                            </b-form>
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
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true,
      //userRole:"",
      modalShow: false,
      searchOpen: true,
      searchTitle: "",
      key:"",
      fields: [ "username", "email", 'show_details' ],
      users: [],
      currentTutorial: null,
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
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
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

    

    retrieveUsers() {
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      );

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
