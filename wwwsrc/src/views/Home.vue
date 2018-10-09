<template>
  <div>
  
  </div>
</template>

<script>
  export default {
    name: "home",
    mounted() {
      //blocks users not logged in
      if (!this.$store.state.user.id) {
        this.$router.push({
          name: "login"
        });
      }
    }
  };
</script>

<style>
  
</style>