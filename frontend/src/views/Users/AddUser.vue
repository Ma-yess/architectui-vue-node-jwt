<template>
    <div class="main-card mb-3 card">
        <div class="card-body">
            <h5 class="card-title">Créer un nouveau utilisateur</h5>
            <div
                    v-if="message"
                    class="alert"
                    :class="successful ? 'alert-success' : 'alert-danger'"
                >{{message}}
            </div>
            <form name="form" @submit.prevent="handleRegister">
                
                <div class="form-row" style="flex-direction: column;">
                    <div class="form-row">
                        <div v-if="!successful" class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="firstName">Nom d'utilisateur *</label>
                                <input v-model="user.username" name="username" id="username" placeholder="Pseudo" type="text" class="form-control">
                                
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div v-if="!successful" class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="firstName">Prénom *</label>
                                <input v-model="user.firstName" name="firstName" id="firstName" placeholder="Prénom" type="text" class="form-control">
                                <div
                                    v-if="submitted && errors.has('firstName')"
                                    class="alert-danger"
                                    >{{errors.first('firstName')}}
                                </div>
                            </div>
                        </div>
                        <div v-if="!successful" class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="lastName">nom *</label>
                                <input v-model="user.lastName" name="lastName" id="lastName" placeholder="nom de famille" type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-row" style="height: 83px;">
                        <div v-if="!successful" class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="email">Email *</label>
                                <input v-model="user.email" name="email" id="email" placeholder="Email adress" type="email" class="form-control">
                            </div>
                        </div>
                        <div v-if="!successful" class="col-md-4">
                            <fieldset class="position-relative row  form-group">
                                <legend class="col-form-label col-sm-2">Role *</legend>
                                <div class="col-sm-12">
                                    <div class="position-relative form-check form-check-inline" style="padding-right: 1.25rem;">
                                        <label class="form-check-label">
                                            <input v-model="user.roles" name="radio2" type="radio" class="form-check-input">
                                             User
                                        </label>
                                    </div>
                                    <div class="position-relative form-check form-check-inline" style="padding-right: 1.25rem;">
                                        <label class="form-check-label">
                                            <input v-model="user.roles" name="radio2" type="radio" class="form-check-input">
                                             Moderator 
                                        </label>
                                    </div>
                                    <div class="position-relative form-check disabled form-check-inline" style="padding-right: 1.25rem;">
                                        <label class="form-check-label">
                                            <input v-model="user.roles" name="radio2" disabled type="radio" class="form-check-input">
                                             Administrator
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div> 
                    <div class="form-row">
                        <div v-if="!successful" class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="examplePassword11">Mot de passe *</label>
                                <input v-model="user.password" name="password" id="examplePassword11" placeholder="Taper Mot de passe" type="password" class="form-control">
                            </div>
                        </div>
                        <div v-if="!successful" class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="confirmPassword">Confirmer mot de passe *</label>
                                <input v-model="user.password" name="confirmPassword" id="confirmPassword" placeholder="Confirmer mot de passe" type="password" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div v-if="!successful" class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="adress">Address</label>
                                <input v-model="user.adress" name="adress" id="address" placeholder="1234 Main St" type="text" class="form-control">          
                            </div>
                        </div>
                        <div v-if="!successful" class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="address2">Address 2</label>
                                <input v-model="user.adress2" name="adress2" id="address2" placeholder="Apartment, studio, or floor" type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <div class="form-row">
                    <div v-if="!successful" class="col-md-4">
                        <div class="position-relative form-group">
                            <label for="city">Ville</label>
                            <input v-model="user.city" name="city" id="ity" type="text" class="form-control">
                        </div>
                    </div>
                    
                    <div v-if="!successful" class="col-md-2">
                        <div class="position-relative form-group">
                            <label for="exampleZip">ZipCode</label>
                            <input v-model="user.zipCode" name="zip" id="exampleZip" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="form-row">
                        <div v-if="!successful" class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="telephone">Téléphone</label>
                                <input v-model="user.phone" name="telephone" id="telephone" placeholder="75555555" type="tel" class="form-control">          
                            </div>
                        </div>
                        <div v-if="!successful" class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="telephone2">Téléphone 2</label>
                                <input v-model="user.phone2" name="telephone2" id="telephone2" placeholder="22222222" type="tel" class="form-control">
                            </div>
                        </div>
                    </div>
                <button class="mt-2 btn btn-primary">Sign in</button>
                
            </form>
            
        </div>
    </div>
</template>

<script>
import User from '../../models/user';

export default {
    name: 'Register',
    data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      alert("heyo")
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/signup', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
}
</script>