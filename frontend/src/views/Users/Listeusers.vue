<template>
    <div>
        <div class="search-wrapper" v-bind:class="{ active: searchOpen }">
            <div class="input-holder">
                <input type="text" class="search-input" placeholder="Type to search" v-on:input="handleSearchChange" v-model="searchTitle"/>
                <button class="search-icon" v-on:click="searchOpen = !searchOpen ,page = 1; retrieveTutorials(); "><span/></button>
            </div>
            <button class="close" v-on:click="searchOpen = !searchOpen"/>
        </div>
        <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" v-on:change="handlePageSizeChange($event)" :key="key">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
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

                  <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
                  <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
                    Details via check
                  </b-form-checkbox>
                </template>

                <template #row-details="row">
                  <b-card>
                    <b-row class="mb-2">
                      <b-col sm="3" class="text-sm-right"><b>Roles:</b></b-col>
                      <b-col>{{ row.item.roles }}</b-col>
                    </b-row>

                    <b-row class="mb-2">
                      <b-col sm="3" class="text-sm-right"><b>ID:</b></b-col>
                      <b-col>{{ row.item.id }}</b-col>
                    </b-row>

                    <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
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

  export default {
    name: 'Listusers',
    
    data: () => ({
      
      searchOpen: true,
      searchTitle: "",
      key:"",
      fields: [ "username", "email", 'show_details' ],
      users: [],
      currentTutorial: null,
      currentIndex: -1,

      page: 1,
      count: 0,
      pageSize: 3,

      pageSizes: [2, 4, 6],
      striped: true,
      bordered: true,
      outlined: false,
      small: false,
      hover: true,
      dark: false,
      fixed: false,
      footClone: false
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

    retrieveTutorials() {
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
        })
        .catch((e) => {
          throw e ;
         // console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveTutorials();
    },
    
    handleSearchChange() {
      this.retrieveTutorials();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveTutorials();
    },

    },
    mounted() {
      this.retrieveTutorials();
    }
  }
</script>
