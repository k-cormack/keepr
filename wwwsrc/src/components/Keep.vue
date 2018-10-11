<template>
    <div class="col-3">
        <div class="card">
            <img class="card-img-top img-responsive" :src="keepData.img" alt=""/>
            <h3>{{keepData.name}}</h3>
            <h5>{{keepData.img}}</h5>

        </div>
    </div>
</template>

<script>
    export default {
        name: "keep",
        data: function () {
            return {

            }
        },
        computed: {

        },
        mounted() {

        },
        props: ["keepData"],

        components: {

        },
    }
</script>

<style>
    .keep {
        background-color: #8aae92;
        min-height: 50vh;
        margin: 10px;
        padding-bottom: 10px;
        border-radius: 10px;
    }

    .card {
        width: 20rem;
        /* border: darkblue; */

    }
</style>