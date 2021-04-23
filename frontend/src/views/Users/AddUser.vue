<template>
    <div class="main-card mb-3 card">
        <div class="card-body">
            <h5 class="card-title">Créer un nouveau utilisateur</h5>
            <form>
                <div class="form-row" style="flex-direction: column;">
                    <div class="form-row">
                        <div class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="firstName">Prénom *</label>
                                <input name="firstName" id="firstName" placeholder="Prénom" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="lastName">nom *</label>
                                <input name="lastName" id="lastName" placeholder="nom de famille" type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="position-relative form-group">
                            <label for="email">Email *</label>
                            <input name="email" id="email" placeholder="Email adress" type="email" class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="examplePassword11">Mot de passe *</label>
                                <input name="password" id="examplePassword11" placeholder="Taper Mot de passe" type="password" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="confirmPassword">Confirmer mot de passe *</label>
                                <input name="confirmPassword" id="confirmPassword" placeholder="Confirmer mot de passe" type="password" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="address">Address</label>
                                <input name="address" id="address" placeholder="1234 Main St" type="text" class="form-control">          
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="address2">Address 2</label>
                                <input name="address2" id="address2" placeholder="Apartment, studio, or floor" type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <div class="form-row">
                    <div class="col-md-4">
                        <div class="position-relative form-group">
                            <label for="city">Ville</label>
                            <input name="city" id="ity" type="text" class="form-control">
                        </div>
                    </div>
                    
                    <div class="col-md-2">
                        <div class="position-relative form-group">
                            <label for="exampleZip">Zip</label>
                            <input name="zip" id="exampleZip" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="form-row">
                        <div class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="telephone">Téléphone</label>
                                <input name="telephone" id="telephone" placeholder="75555555" type="tel" class="form-control">          
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="position-relative form-group">
                                <label for="telephone2">Téléphone 2</label>
                                <input name="telephone2" id="telephone2" placeholder="22222222" type="tel" class="form-control">
                            </div>
                        </div>
                    </div>
                <button class="mt-2 btn btn-primary">Sign in</button>
            </form>
        </div>
    </div>
</template>