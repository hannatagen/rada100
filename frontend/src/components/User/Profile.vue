<template>
    <div class="card">
        <div class="card-body">
            <img class="card-img-top" src="../../assets/user_default.png" alt="Profile picture">
            <h5 class="card-title">Kasutajanimi</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <strong>Tase:</strong>
                <span id="level">3</span>
            </li>
            <li class="list-group-item">
                <h6 class="card-title">Pooleliolevad mängud:</h6>
            </li>
            <li class="list-group-item">
                <h6 class="card-title">Lõpetatud mängud:</h6>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: 'Profile',
    };
</script>

<style scoped>
    .card-img-top {
        width: 8em !important;
    }

    .card-body {
        text-align: center;
    }

    .card {
        color: black;
    }

    #level {
        float: right;
    }
    .card-title {
        font-weight: bold;
    }
</style>
