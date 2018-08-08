<template>
	<van-tabbar v-model="active">
		<van-tabbar-item icon="home">首页</van-tabbar-item>
		<van-tabbar-item icon="pending-orders">工作台</van-tabbar-item>
		<van-tabbar-item icon="contact">我的</van-tabbar-item>
	</van-tabbar>
</template>

<script type="ecmascript-6">
import {
  Tabbar,
  TabbarItem
}
  from 'vant';

export default {
  data () {
    return {
      active: 0
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
};
</script>

<style rel="stylesheet">
</style>
