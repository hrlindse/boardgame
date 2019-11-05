import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Player2 from "./components/Player2.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    // { path: "/", component: Home },
    { path: "/player2", components: { player2: Player2 } }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
