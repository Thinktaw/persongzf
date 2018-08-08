import Vue from 'vue';
import VueRouter from 'vue-router';
import AddInternalUser from './views/AddInternalUser.vue';
import InternalUser from './views/InternalUser.vue';
import ModifyName from './views/ModifyName.vue';
import ModifyUserphone from './views/ModifyUserphone.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/AddInternalUser',
    component: AddInternalUser,
    meta: {
      title: '添加内部账户'
    }
  },
  {
    path: '/InternalUser',
    component: InternalUser,
    meta: {
      title: '内部账号管理'
    }
  },
  {
    path: '/ModifyName',
    component: ModifyName,
    meta: {
      title: '修改密码'
    }
  },
  {
    path: '/ModifyUserphone',
    component: ModifyUserphone,
    meta: {
      title: '更换手机号'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
