<template>
  <div class="RePasswordByemailstep2">
    <div class="nav">
      <van-nav-bar
      title="邮箱找回"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      />
    </div>
    <div class="content-password">
      <h2 class="van-doc-demo-block__title">请输入新密码</h2>
        <van-cell-group>
          <van-field
          required
          clearable
          type="password"
          v-model="password"
          label="新密码"
          placeholder="请输入新密码"
          :error-message="errmsg2"
          />
        </van-cell-group>
        <van-button class="content-button" size="normal" type="primary" @click="onClicksubmit">确定</van-button>
    </div>
  </div>
</template>
<script type="ecmascript-6">
import {
  NavBar,
  CellGroup,
  Cell,
  Button,
  Field,
  Toast,
  Dialog
}
  from 'vant';
import axios from 'axios';
export default {
  data () {
    return {
      password: '',
      errmsg2: ''
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  methods: {
    onClickLeft () { // 返回上一级
      this.$router.go(-1);
    },
    onClicksubmit () { // 重置新密码
      let username = this.$route.query.username;
      let password = this.password;
      let email = this.email;
      axios
        .get('', {
          username: username,
          password: password,
          email: email
        })
        .then((response) => {
          Dialog.alert({
            message: '新密码设置成功'
          }).then(() => {
            // on close
          });
        })
        .catch((error) => {
          console.log(error);
          Dialog.alert({
            message: '新密码设置失败,请重试!'
          }).then(() => {
            // on close
          });
        });
    }
  }
};
</script>

<style rel="stylesheet">
.van-nav-bar__text {
	font-size: 16px;
}
.content-button {
  width: 90%;
  margin-top: 10px;
  font-size: 20px;
}
.van-doc-demo-block__title {
  text-align: left;
  margin: 0;
  font-weight: 400;
  font-size: 18px;
  color: rgba(69,90,100,.6);
  padding: 10px 15px 5px;
}
</style>
