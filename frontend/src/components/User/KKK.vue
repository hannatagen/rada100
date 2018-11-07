<template>
    <div class="sidebarContainer">
        <h3 class="sidebarHeadline">Korduma kippuvad küsimused</h3>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Kuidas kontot luua?</h5>
                <p class="card-text">Kontot saab luua, vajutades avalehel päises oleval burgermenüü nupul,
                    mis asub vasakul üleval nurgas. Seejärel avanenud küljemenüüst tuleks valida "Logi sisse"
                    alamleht, kus saab ühtlasi ka konto luua.</p>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Kuidas alustada mängu?</h5>
                <p class="card-text">
                    Mängu saab alustada kahel kahel viisil:<br>
                    1. valid avalehel sobiva raja punkti, mida mängida soovid.
                    Seejärel avaneb all infoaken, kus on nupp "Mängima". Seda nuppu vajutades
                    oled alustanud ühte mängu.<br>
                    2. valid küljemenüüst alamlehe "Radade nimekiri", valid sealt sobiva raja ja
                    vajutad taas nuppu "Mängima".
                </p>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Kuidas saan poolelijäetud mängu jätkata?</h5>
                <p class="card-text">
                    Mängu saab jätkata, võttes küljemenüüst lahti kasutaja profiili,
                    valida pooleliolevate mängude sektsioonist sobiv mäng ja vajutada nupule "Jätka mängu".
                </p>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Kuidas saab alustatud mängu on võimalik pausile panna?</h5>
                <p class="card-text">
                    Kui oled alustanud mängu, siis on all näha staatiline riba, kus on välja toodud
                    käesoleva mänguga seotud info (nt läbitud punktid) ning paremal asub ka nupp "Paus".
                </p>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Kas saan mängu katkestada?</h5>
                <p class="card-text">
                    Mängu katkestada võimalik ei ole, küll aga on võimalik mäng pausile panna ja vahepeal
                    mõnda
                    muud rada mängida. Mäng loetakse lõpetatuks ainult siis, kui kõik raja punktid on
                    läbitud.
                </p>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'KKK',
    };
</script>

<style scoped>
    .card {
        margin-bottom: 0.5em !important;
    }
</style>
