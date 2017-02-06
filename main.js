import Vue from "vue"
import todos from "./components/app.vue"
import store from "./store/store"


new Vue({
  store,
  "el": app,
  components: { todos }
})
