<template>
  <div class="col-md-6 col-md-offset-3">

    <div class="row row-todo-header">
      <h1>TODOS</h1>
    </div>

    <div class="row row-input">
      <div class="col-md-12">
        <input id="myInput" type="text" v-on:keyup.enter="addTodo" placeholder="What needs to be done?">
      </div>
    </div>
    <div class="row row-todo-list">
      <div class="col-md-12">
        <!--<button v-on:click="addTodo">Add</button>-->
        <ul class="list-unstyled"> 
          <li v-for="todo in filterTodos">
            <div class="clearfix" v-on:mouseover="mouseOver(todo.id)" v-on:mouseleave="mouseLeave">
              <input v-model=todo.done class="checkbox-circle" type="checkbox" v-on:click="checkboxClick(todo.id, todo.done)"></input>
              <label v-bind:class="[todo.done ? 'todo-done': '']">{{ todo.text }}</label>
              <a class="pull-right todo-remove" v-on:click="deleteTodo(todo.id)" v-show="getCurrentActive(todo.id)">x</a>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="row row-bottom">
      <div class="col-md-12">
        <button v-on:click="show='all'">All</button>
        <button v-on:click="show='todo'">Active</button>
        <button v-on:click="show='done'">Completed</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: "all",
        mouseoverId: 0,
      }
    },
    methods: {
      deleteTodo: function(id) {
        this.$store.dispatch("deleteTodo", id)
      },
      getCurrentActive: function(id) {
        return this.mouseoverId === id
      },
      mouseOver: function(id) {
        this.mouseoverId = id
      },
      mouseLeave: function() {
        this.mouseoverId = 0
      },
      addTodo: function() {
        const todo = document.getElementById("myInput").value
        this.$store.dispatch("add", todo)
        document.getElementById("myInput").value = ''
        //this.$store.commit("addTodo", todo)
      },
      checkboxClick: function(id, done) {
        this.$store.dispatch("checkboxClick", id, done)
      },
    }, 
    computed: {
      filterTodos: function() {
        this.$store.dispatch("getTodos", this.$store.state.fetched)
        const filterTodos = Object.values(this.$store.getters.todos)
        if (this.show === "todo"){
          return filterTodos.filter(item => item.done == false)
        } else if (this.show === "done") {
          return filterTodos.filter(item => item.done)
        } else {
          return filterTodos
        }
      },
      newTodo: function() {
        return this.$store.state.newTodo
      },
    },
  }
 
</script>
