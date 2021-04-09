<template>
    <div>
        <div class="h-100 bg-plum-plate bg-animation">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    

                    <div class="modal-dialog w-100 mx-auto">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="h5 modal-title text-center">
                                    <h4 class="mt-2">
                                        <div>Welcome back,</div>
                                        <span>Please sign in to your account below.</span>
                                    </h4>
                                </div>
                                <form name="form" @submit.prevent="handleLogin">
                                    <div class="position-relative form-group">
                                        <label for="username" class="">Username</label>
                                        <input name="username"
                                                id="username"
                                                v-model="user.username"
                                                placeholder="nom d'utilisateur"
                                                type="text"
                                                class="form-control">
                                        
                                    </div>
                                    <div class="position-relative form-group">
                                        <label for="password" class="">Password</label>
                                        <input name="password" id="password" v-model="user.password" placeholder="Mot de passe" type="password" class="form-control">
                                        
                                    </div>
                                    <div class="float-right form-group">
                                        <b-button variant="primary" type="submit" size="lg" :disabled="loading">
                                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                            <span>Login to Dashboard</span>
                                        </b-button>
                                    </div>
                                    <div class="form-group">
                                        <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
                                        </div>
                                </form>

                            
                        </div>
                    </div>
                    </div>
                </b-col>
            </div>
        </div>
    </div>
</template>

<script>
import User from '../models/user';
export default {
    name: 'Login',
    data() {
        return {
            user: new User('', ''),
            loading: false,
            message: ''
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    created () {
        if (this.loggedIn) {
            this.$router.push('/profile');
        }
    },
    methods: {
        handleLogin() {
            alert("ok");
            this.loading = true;
            this.$validator.validateAll().then(isValid => {
                if(!isValid) {
                    this.loading = false;
                    return;
                }

                if(this.user.username && this.user.password) {
                    this.$store.dispatch('auth/login', this.user).then(
                        () => {
                            this.$router.push('/profile');
                        },
                        error => {
                            this.loading = false;
                            this.message = (error.response && error.response.data) ||
                            error.methods ||
                            error.toString();
                        }
                    );
                }
            });
        }
    }
};
</script>