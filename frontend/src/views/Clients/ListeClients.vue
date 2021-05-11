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
                  <button type="button" class="btn-shadow d-inline-flex align-items-center btn btn-success" @click="$router.push('/signup')">
                      <font-awesome-icon class="mr-2" icon="plus"/>
                      Créer un nouveau
                  </button>
              </div>
          </div>
        </div> 
            
            <b-table striped hover :items="items" :fields="fields">
                <template #cell(index)="data">
                    {{ data.index + 1 }}
                </template>
                <template #cell(customerFirstName)="data">
                    {{ data.item.customerFirstName }}
                </template>
                <template #cell(customerLastName)="data">
                    {{ data.item.customerLastName }}
                </template>
                <template #cell(customerEmail)="data">
                    {{ data.item.customerEmail }}
                </template>
                <template #cell(customerPhone)="data">
                    {{ data.item.customerPhone }}
                </template>
                <template #cell(customerPhone2)="data">
                    {{ data.item.customerPhone2 }}
                </template>
                <template #cell(customerAdress)="data">
                    {{ data.item.customerAdress }}
                </template>
                <template #cell(customerAdress2)="data">
                    {{ data.item.customerAdress2 }}
                </template>
                 <template #cell(customerCity)="data">
                    {{ data.item.customerCity }}
                </template>
                 <template #cell(customerState)="data">
                    {{ data.item.customerState }}
                </template>
                <template #cell(customerZipCode)="data">
                    {{ data.item.customerZipCode }}
                </template>
            </b-table>
    </div>
</template>

<script>
import ClientService from "../../services/client.service";
export default {
    name: 'ListClients',
    data: () => ({
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
            }
           ],
            items: [],
            searchOpen: true,
            searchTitle: "",

    }),

    methods: {

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

        retrieveClients() {
                ClientService.getClientsList().then((result) => {
                
                this.items = result.data;
                
                }).catch((e) => {
                throw e ;
                // console.log(e);
                });
        },
        
        handleSearchChange() {
                this.retrieveClients();
        },
    },

    mounted() {
        this.retrieveClients();
    }
}
</script>
