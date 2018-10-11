<template>
    <div>
        <h3>{{keepData.name}}</h3>
        <h5>{{keepData.img}}</h5>

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
</style>