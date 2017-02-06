<template>
  <div>
    this is a component
    <br/>
    {{ count }}
  </div>
</template>

<script>
  export default {
    computed: {
      count: function() {
        return this.$store.state.count
      }
    },
    components: {
    }
  }
 
</script>
