<template>
    <div class="ModifyUserphone">
        <div class="nav">
            <van-nav-bar
            title="更换手机号"
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
  Toast,
  Cell,
  CellGroup,
  Field,
  Button,
  Dialog
}
  from 'vant';
export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  methods: {
    onClickLeft () {
      Toast('返回');
    }
  }
};
</script>

<style rel="stylesheet">
.van-nav-bar__text {
	font-size: 16px;
}
</style>
