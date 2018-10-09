<template>
    <div id="browse-vaults">
        
    </div>
</template>

<script>
    export default {
        name: 'BrowseVaults',
        data () {
            return {
                newVault : {
                    title: "",
                    decription: ""
                }
            };
        },
        mounted(){
            this.$store.dispatch("getVaults");
        },
        computed: {
            vaults() {
                return this.$store.state.vaults;
            }
        }

    }
</script>

<style>
 
</style>