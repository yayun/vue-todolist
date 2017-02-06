<template>
  <div>
    <p>undos:</p>
    <div v-for="(todo, key) in todoLists">
      <div v-if="todo.active==false">
        {{ todo.text }}
      <div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      todoLists: function() {
        return this.$store.getters.todos
      }
    },
  }
</script>
