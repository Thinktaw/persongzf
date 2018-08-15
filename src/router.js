import Vue from 'vue';
import VueRouter from 'vue-router';
import AddInternalUser from './views/AddInternalUser.vue';
import InternalUser from './views/InternalUser.vue';
import ModifyPassword from './views/ModifyPassword.vue';
import ModifyUserphone from './views/ModifyUserphone.vue';
import ValidateUserphone from './views/ValidateUserphone.vue';
import RetrievePassword from './views/RetrievePassword.vue';
import RePasswordByphone from './views/RePasswordByphone.vue';
import RePasswordByemail from './views/RePasswordByemail.vue';
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
    path: '/ModifyPassword',
    component: ModifyPassword,
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
  },
  {
    path: '/ValidateUserphone',
    component: ValidateUserphone,
    meta: {
      title: '更换手机号'
    }
  },
  {
    path: '/RetrievePassword',
    component: RetrievePassword,
    meta: {
      title: '找回密码'
    }
  },
  {
    path: '/RePasswordByphone',
    component: RePasswordByphone,
    meta: {
      title: '短信验证码找回'
    }
  },
  {
    path: '/RePasswordByemail',
    component: RePasswordByemail,
    meta: {
      title: '邮箱找回'
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
