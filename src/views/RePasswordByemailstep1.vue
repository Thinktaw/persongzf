<template>
  <div class="RePasswordByemailstep1">
    <div class="nav">
      <van-nav-bar
      title="邮箱找回"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <div class="content-email">
        <van-field
        type="email"
        required
        clearable
        v-model="email"
        label="电子邮箱"
        placeholder="请输入您的电子邮箱"
        :error-message="errmsg1"
        />
        <van-button class="content-button" size="normal" type="primary" @click="onClicknext">下一步</van-button>
      </div>
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
      email: '',
      errmsg1: ''
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
    onClicknext () { // 发送邮件，如果用户邮箱确实存在用户表中,并构造URL发送到用户邮箱中
      let email = this.email;
      let preg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // 匹配Email
      if (email === '' || !preg.test(email)) {
        this.errmsg1 = '请填写正确的邮箱';
      } else {
        this.errmsg1 = '';
        axios
          .post('', { email: email })
          .then((response) => {
            // url example 'http://10.58.1.103:8080/RePasswordByemailstep2?username='小明';
            Dialog.alert({
              message: '系统已向您的邮箱发送了一封邮件,请登录您的邮箱进行查看!'
            }).then(() => {
              // on close
            });
          })
          .catch((error) => {
            console.log(error);
            Toast('该邮箱尚未注册!');
          });
      }
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
