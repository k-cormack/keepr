<template>
  <div>
    <navbar></navbar>
    <MyVaults></MyVaults>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue'
  import MyVaults from '../views/MyVaults.vue'

  export default {
    name: "home",
    mounted() {
      //blocks users not logged in
      if (!this.$store.state.user.id) {
        this.$router.push({
          name: "login"
        });
      }
    },
    components: {
      Navbar,
      MyVaults
    }
  };
</script>

<style>

</style>