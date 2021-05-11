<template>
    <div>
        
        <div class="app-page-title">
          <div class="page-title-wrapper">
              <div class="search-wrapper " v-bind:class="{ active: searchOpen }">
              <div class="input-holder">
                  <input type="text" class="search-input" placeholder="Tapez pour rechercher" v-on:input="handleSearchChange" v-model="searchTitle"/>
                  <button class="search-icon" v-on:click="searchOpen = !searchOpen ,page = 1; retrieveClients(); "><span/></button>
              </div>
              <button class="close" v-on:click="searchOpen = !searchOpen"/>
          </div>
              <div class="page-title-actions">
                  <button type="button" class="btn-shadow d-inline-flex align-items-center btn btn-success" @click="$router.push('/add')">
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
        <b-card title="Tous les clients" class="main-card mb-4">
            <b-table :striped="striped"
                 :bordered="bordered"
                 :outlined="outlined"
                 :small="small"
                 :hover="hover"
                 :dark="dark"
                 :fixed="fixed"
                 :foot-clone="footClone"
                 :items="clients"
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
                                <b-col>{{ row.item.customerFirstName }}</b-col>
                              </b-row>

                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Last Name:</b></b-col>
                                <b-col>{{ row.item.customerLastName }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Email Adress:</b></b-col>
                                <b-col>{{ row.item.customerEmail }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Password:</b></b-col>
                                <b-col>{{ row.item.customerPassword }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Téléphone:</b></b-col>
                                <b-col>{{ row.item.customerPhone }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Téléphone2:</b></b-col>
                                <b-col>{{ row.item.customerPhone2 }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Adress:</b></b-col>
                                <b-col>{{ row.item.customerAdress }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Adress 2:</b></b-col>
                                <b-col>{{ row.item.customerAdress2 }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Ville:</b></b-col>
                                <b-col>{{ row.item.customerCity }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>State:</b></b-col>
                                <b-col>{{ row.item.customerState }}</b-col>
                              </b-row>
                              <b-row class="col-md-4 mb-2">
                                <b-col sm="4" class="text-sm-right"><b>Code Pstale:</b></b-col>
                                <b-col>{{ row.item.customerZipCode }}</b-col>
                              </b-row>
                              
                          </div>
                          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                          <b-button size="sm" class=" ml-2" @click="deleteClient(row.item.id);">Delete Client</b-button>
                          <b-button v-b-modal.modal-no-backdrop @click="successful = false; getUpdated(row.item.id, row.item.customerFirstName, row.item.customerLastName, row.item.customerEmail, row.item.customerPassword, row.item.customerPhone, row.item.customerPhone2, row.item.customerAdress, row.item.customerAdress2, row.item.customerCity, row.item.customerState,  row.item.customerZipCode)" variant="success" size="sm" class=" btn btn-primary ml-2">EDIT</b-button>
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
                                                <label for="FirstName">FirstName *</label>
                                                <input v-model="form.customerFirstName" name="FirstName"   type="text" class="form-control">
                                                
                                            </div>
                                        </div>
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="LastName">LastName *</label>
                                                <input v-model="form.customerLastName" name="LastName"   type="text" class="form-control">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="email">Email *</label>
                                                <input v-model="form.customerEmail" name="email"  type="email" class="form-control">
                                            </div>
                                        </div>
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="Password">Password *</label>
                                                <input v-model="form.customerPassword" name="Password"   type="text" class="form-control">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="telephone">Téléphone</label>
                                                <input v-model="form.customerPhone" name="telephone"   type="tel" class="form-control">          
                                            </div>
                                        </div>
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="telephone2">Téléphone 2</label>
                                                <input v-model="form.customerPhone2" name="telephone2"   type="tel" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="adress">Address</label>
                                                <input v-model="form.customerAdress" name="adress"  type="text" class="form-control">          
                                            </div>
                                        </div>
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="adress2">Address 2</label>
                                                <input v-model="form.customerAdress2" name="adress2"   type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="city">Ville</label>
                                                <input v-model="form.customerCity" name="city"  type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="state">State</label>
                                                <input v-model="form.customerState" name="state"  type="text" class="form-control">
                                            </div>
                                        </div>
                                    
                                    </div> 
                                    <div class="form-row">
                                        <div v-if="!successful" class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="zipCode">ZipCode</label>
                                                <input v-model="form.customerZipCode" name="zipCode"  type="text" class="form-control">
                                            </div>
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

import ClientService from "../../services/client.service";
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
    name: 'Listclients',
    components: {
            'font-awesome-icon': FontAwesomeIcon,
        },
    data: () => ({
      
      form: {
          id:"",
          customerFirstName:"",
          customerLastName: "",
          customerEmail: "",
          customerPassword: "",
          customerPhone: "",
          customerPhone2: "",
          customerAdress: "",
          customerAdress2: "",
          customerCity: "",
          customerState: "",
          customerZipCode: "",
        },
        message:"",
        show: true,
        submitted: false,
        successful: false,
      
      modalShow: false,
      searchOpen: true,
      searchTitle: "",
      key:"",
      fields: [
            'index',
            {
                key: 'customerFirstName',
                label: 'First Name',
                sortable: true
            },
            {
                key: 'customerLastName',
                label: 'Last Name',
                sortable: false
            },
            {
                key: 'customerEmail',
                label: 'Email',
                //label: 'Client email',
                sortable: false,
                // Variant applies to the whole column, including the header and footer
                //variant: 'danger'
            },
            {
                key: 'customerPassword',
                label: 'Password',
                //label: 'Client Password',
                sortable: false,
                // Variant applies to the whole column, including the header and footer
                //variant: 'danger'
            },
             {
                key: 'customerPhone',
                label: 'Phone',
                //label: 'Client age',
                sortable: false,
                // Variant applies to the whole column, including the header and footer
                //variant: 'danger'
            },
            {
                key: 'customerPhone2',
                label: 'Phone 2',
                //label: 'Client phone 2',
                sortable: false,
                // Variant applies to the whole column, including the header and footer
                //variant: 'danger'
            },
            {
                key: 'customerAdress',
                label: 'Adress',
                //label: 'Client adress',
                sortable: false,
                // Variant applies to the whole column, including the header and footer
                //variant: 'danger'
            },
            {
                key: 'customerAdress2',
                label: 'Adress 2',
                //label: 'Client adress 2',
                sortable: false,
                // Variant applies to the whole column, including the header and footer
                //variant: 'danger'
            },
            {
                key: 'customerCity',
                label: 'City',
                //label: 'Client adress 2',
                sortable: false,
                // Variant applies to the whole column, including the header and footer
                //variant: 'danger'
            },
            {
                key: 'customerState',
                label: 'State',
                //label: 'Client adress 2',
                sortable: false,
                // Variant applies to the whole column, including the header and footer
                //variant: 'danger'
            },
            {
                key: 'customerZipCode',
                label: 'Zip Code',
                //label: 'Client zip code',
                sortable: false,
                // Variant applies to the whole column, including the header and footer
                //variant: 'danger'
            },
            'show_details'
           ],
      clients: [],
      clientToUpdate: {},
      currentIndex: -1,

      page: 1,
      count: 0,
      pageSize: 2,

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
        
        this.clientToUpdate = JSON.stringify(this.form)
        alert(this.clientToUpdate)
        alert(this.form.id)
        this.hundleUpdate(this.form.id, this.clientToUpdate)
      },

      hundleUpdate(id, data) {
        
        
      ClientService.updateClient(id, data)
        .then(response => {
          alert('heeyy' + response);
          this.message = 'The client was updated successfully!';
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
      this.form.customerFirstName = '';
      this.form.customerLastName = '';
      this.form.customerEmail = '';
      this.form.customerPassword = '';
      this.form.customerPhone = '';
      this.form.customerPhone2 = '';
      this.form.customerAdress = '';
      this.form.customerAdress2 = '';
      this.form.customerCity = '';
      this.form.customerState = '';
      this.form.customerZipCode = '';
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

        getRequestParams(searchTitle, page, pageSize) {
      let params = {};

      if (searchTitle) {
        params["customerFirstName"] = searchTitle;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    

    deleteClient(id) {
      const idClient = id;
      alert(idClient)
      ClientService.deleteClient(idClient)
        .then(response => {
          alert(response.data);
          this.retrieveClients();
        })
        .catch(e => {
          throw(e);
        });
    },

    getUpdated(id,customerFirstName, customerLastName, customerEmail, customerPassword, customerPhone, customerPhone2, customerAdress, customerAdress2, customerCity, customerState, customerZipCode) {
      this.modalShow = !this.modalShow
      alert(customerEmail)
      this.form.id = id;
      this.form.customerFirstName = customerFirstName;
      this.form.customerLastName = customerLastName;
      this.form.customerEmail = customerEmail;
      this.form.customerPassword = customerPassword;
      this.form.customerPhone = customerPhone;
      this.form.customerPhone2 = customerPhone2;
      this.form.customerAdress = customerAdress;
      this.form.customerAdress2 = customerAdress2;
      this.form.customerCity = customerCity;
      this.form.customerState = customerState;
      this.form.customerZipCode = customerZipCode;
      alert(this.form)
    },
    

    retrieveClients() {
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      );
      this.message = '';
      ClientService.getClientsList(params)
        .then((response) => {
          const { clients, totalItems } = response.data;
          this.clients = clients;
          this.count = totalItems;
          
        })
        .catch((e) => {
          throw e ;
         // console.log(e);
        });
    },
    
    handlePageChange(value) {
      this.page = value;
      this.retrieveClients();
    },
    
    handleSearchChange() {
      this.retrieveClients();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveClients();
    },

    },
    mounted() {
      this.retrieveClients();
    }
  }
</script>
