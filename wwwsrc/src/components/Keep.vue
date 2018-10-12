<template>
    
        <div class="card">
            <img class="card-img-top img-responsive" :src="keepData.img" alt=""/>
            <div class="card-body">
                <h3>{{keepData.name}}</h3>
                <p>{{keepData.description}}</p>
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
    /* .keep {
        background-color: #8aae92;
        min-height: 50vh;
        margin: 10px;
        padding-bottom: 10px;
        border-radius: 10px;
    } */

    .card {
        width: 20rem;
        /* border: darkblue; */

    }
</style>