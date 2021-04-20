<template>
    <div>
        <b-card title="Tous les utilisateurs" class="main-card mb-4">
            <b-table :striped="striped"
                 :bordered="bordered"
                 :outlined="outlined"
                 :small="small"
                 :hover="hover"
                 :dark="dark"
                 :fixed="fixed"
                 :foot-clone="footClone"
                 :items="items"
                 :titres="titres">
            </b-table>
        </b-card>

    </div>
</template>

<script>

  

  export default {
    name: 'Listusers',
    data: () => ({
      

      titres: [ "nom_utilisateur", 'email', 'role' ],
      items: [
        { role: 'Admin', nom_utilisateur: 'Dickerson', email: 'Macdonald' },
        { role: 'user', nom_utilisateur: 'Larsen', email: 'Shaw' },
        { role: 'moderator', nom_utilisateur: 'Geneva', email: 'Wilson' }
      ],
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

    }
  }
</script>
