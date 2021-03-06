// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { router } from './router';
import VueResource from 'vue-resource';
import icon from '@/components/Icon.vue';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.component('icon', icon);
Vue.use(VeeValidate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
