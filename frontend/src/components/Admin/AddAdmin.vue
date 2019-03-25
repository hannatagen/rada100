<template>
    <div class="adminInviteContainer">
        <div id="adminInviteCardContainer">
            <div class="card adminCard container">
                <br>
                <h5 class="card-title">
                    Lisa uus admin
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    Uue adminkasutaja lisamiseks sisesta uue konto omaniku nimi, email, vali konto roll ning vajuta nuppu "Saada kutse".
                    <br>
                    <br>
                    Sisestatud meiliaadressile saadetakse link, läbi mille saab kutsutud isik endale konto teha.
                </h6>
                <div class="card-body">
                    <div>
                        <h5 class="card-title">Nimi: </h5>
                        <input v-model="username" type="text" class="form-control" aria-label="Name">
                    </div>
                    <br>
                    <div>
                        <h5 class="card-title">Email: </h5>
                        <input v-model="email" type="email" class="form-control" aria-label="Name">
                    </div>
                    <br>
                    <div>
                        <h5 class="card-title">Roll: </h5>
                        <div class="form-check">
                            <input type="radio" class="form-check-input" id="materialUnchecked" name="materialExampleRadios" checked>
                            <label class="form-check-label" for="materialUnchecked">ADMIN</label>
                        </div>
                        <div class="form-check">
                            <input type="radio" class="form-check-input" id="materialChecked" name="materialExampleRadios">
                            <label class="form-check-label" for="materialChecked">SUPERADMIN</label>
                        </div>
                    </div>
                    <br>
                    <button id="adminSendInviteBtn"
                            class="navbarBtn btn btnGreen">Saada kutse</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddAdmin",
        data() {
            return {
                email: '',
                username: '',
                password: '',
                passwordRepeat: '',
                role: '',
                modifyDataModeActive: false,
            };
        },
    }
</script>

<style scoped>
    .adminCard {
        /*left: 50%;*/
        width: auto;
        max-width: 35em !important;
        display: block;
    }

    .adminInviteContainer {
        text-align: left;
    }

    #adminInviteCardContainer {
        margin-top: 1em;
        padding-bottom: 2em;
        padding-left: 1em;
    }

    #adminSendInviteBtn {
        margin-left: 35%;
    }
</style>
