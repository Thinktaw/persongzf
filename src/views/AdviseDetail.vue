<template>
  <div class="AdviseDetail">
    <div class="nav">
      <van-nav-bar
      title="建议"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      />
    </div>
  </div>
</template>

<script type="ecmascript-6">
import {
  NavBar,
  Button,
  Toast,
  Dialog,
  Field
}
  from 'vant';
export default {
  data () {
    return {

    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [Field.name]: Field
  },
  methods: {
    onClickLeft () { // 返回上一层
      this.$router.go(-1);
    }
  }
};
</script>

<style rel="stylesheet">
.van-nav-bar__text {
  font-size: 16px;
}
</style>
