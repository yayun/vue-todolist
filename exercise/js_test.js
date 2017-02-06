import Vuex from "vuex"
import { mapState } from "vuex"
import { mapGetters } from "vuex"
import miao from "./App.vue"
import vueResource from "vue-resource"

Vue.use(Vuex)
Vue.use(vueResource)
const store = new Vuex.Store({
  state: {
    count: 0,
    cou: 2,
    todos: [
      {id: 1, text: '1...', done: true},
      {id: 2, text: '2...', done: false}
    ],
     todolist store
    notes: [],
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
    incrMulti (state, payload){
      state.cou += payload.amount
    },
     todolist mutation
    incrnote (state) {
      state.notes.push("yayun_test_1")
    },
    decrnote (state) {
      state.notes.pop()
    }
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  },
  actions: {
  }
})
 可以在组件里面定义其他组件(child 只能在这里面用)
var component = Vue.extend({
    template: "<div>this is a component</div>",
})
组件注册等同于在Vue里面定义
Vue.component("com", component)

 可以在一个步骤注册和扩展
Vue.component("hello", {
    template: "<div>helllo</div>"
})

定义一个component
var Counter = {
  template: "<div>{{ counter }}</div>",
  computed: {
    counter () {
      return store.state.count
    }
  }
}

new Vue({
  el: '#app',
  store,
  等同于下面写的mapstate
  computed: {
    count: function() {
      return store.state.count
    }
  },
  computed: mapState({
    count: state => state.count,
  }),
  computed: mapState([
    名字相同时可以指定
    "count"
  ])
  也可以使用mapgetters来简化流程
  computed: {
    dotos: function() {
      return store.getters.doneTodos
  },
  computed: mapGetters({
    doneTodos: "doneTodos"
  }),
  computed: mapState(["count", "cou"]),
  computed: {
    notes: function() {
      return store.state.notes
    }
  },
  methods: {
     可以在method里面写mapMutation
    incr: function(event){
      store.commit('increment')
    },
    decr: function() {
      store.commit('decrement')
    },
    incrmu: function() {
      store.commit(
        "incrMulti",
        {"amount": 10}
      )
    },
    incrnote: function() {
      store.commit("incrnote")
    },
    decrnote: function() {
      store.commit("decrnote"),
      this.$http.get("https:activity.beta.elenet.me/lucky/promotion_page/21").then(
        (response) => {console.log(response.body)})
    }
        function(data){
          console.log(data)
        }
  },
  components: { miao },
})
