import Vue from "vue"
import Vuex from "vuex"
import vueResource from "vue-resource"

Vue.use(Vuex)
Vue.use(vueResource)

const state = {
    todos: {}, 
    newTodo: '',
    fetched: 0,
  }

const mutations = {
    addTodo (state, todo) {
      Vue.set(state.todos, todo.id, todo)
    },
    checkboxClick (state, key, done) {
      if (done === true){
        Vue.set(state.todos, key, {"text": state.todos[key]["text"], "done": false})
      } else if (done == false ){
        Vue.set(state.todos, key, {"text": state.todos[key]["text"], "done": true})
      }
    },
    initTodos (state, todos) {
      for (let i of todos) {
        Vue.set(state.todos, i.id, i)
      }
      state.fetched = 1
    },
    deleteTodo (state, id) {
      Vue.delete(state.todos, id)
    },
  }

const getters = {
    todos: state => {
      return state.todos
    }
}

const actions = {
  deleteTodo ({commit}, id) {
    const url = "http://127.0.0.1:5000/todo/id"
    Vue.http.delete(url.replace(/id/g, id)).then(
      (response) => {
        commit("deleteTodo", id)
      }
    )
  },
  getTodos ({commit}, fetched) {
    if (fetched === 1) {return}
    Vue.http.get("http://127.0.0.1:5000/todos").then(
      (response) => {
        commit("initTodos", response.body)
      }
    )
  },
  add ({commit}, text) {
    Vue.http.post("http://127.0.0.1:5000/todo", {"todo_text": text}).then(
      (response) => {
        const todo = {"id": response.body.id, "done": false, "text": text}
        commit("addTodo", todo)
      }
    )
  },
  checkboxClick ({commit}, id, done) {
    const url = "http://127.0.0.1:5000/todo/id"
    Vue.http.put(url.replace(/id/g, id)).then(
      (response) => {
        commit("checkboxClick", id, done)
      }
    )
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
