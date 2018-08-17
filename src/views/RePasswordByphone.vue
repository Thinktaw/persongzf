<template>
  <div class="RePasswordByphone">
    <div class="nav">
      <van-nav-bar
      title="短信验证码找回"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <div class="content-phone" v-show="contentPhone">
        <van-cell-group>
          <van-field
          type="tel"
          maxlength="11"
          required
          clearable
          v-model="phone"
          label="手机号"
          placeholder="请输入手机号"
          :error-message="errmsg1"
          @blur="onblurphone"
          />
          <van-field
          type="tel"
          v-model="sms"
          center
          required
          clearable
          :error-message="errmsg2"
          label="短信验证码"
          placeholder="请输入短信验证码"
          >
          <van-button slot="button" size="small" type="primary" @click="onClickVerif">发送验证码</van-button>
          </van-field>
          <van-button class="content-button" size="normal" type="primary" @click="onClicknext">下一步</van-button>
        </van-cell-group>
      </div>
      <div class="content-password" v-show="contentPassword">
      <h2 class="van-doc-demo-block__title">请输入新密码</h2>
        <van-cell-group>
          <van-field
          required
          type="password"
          v-model="password"
          label="新密码"
          placeholder="请输入新密码"
          :error-message="errmsg3"
          />
        </van-cell-group>
        <van-button class="content-button" size="normal" type="primary" @click="onClicksubmit">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import {
  NavBar,
  CellGroup,
  Cell,
  Field,
  Button,
  Toast,
  Dialog
}
  from 'vant';
import axios from 'axios';
export default {
  data () {
    return {
      errmsg1: '',
      errmsg2: '',
      errmsg3: '',
      phone: '',
      sms: '',
      password: '',
      contentPassword: false,
      contentPhone: true
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  methods: {
    onClickLeft () { // 返回上一层
      this.$router.go(-1);
    },
    onblurphone () {
      let phone = this.phone;
      if (phone === '') {
        this.errmsg1 = '手机号不能为空';
      } else if (phone.length !== 11) {
        this.errmsg1 = '手机号格式错误';
      } else {
        this.errmsg1 = '';
        axios
          .get('', { phone: phone })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
            this.errmsg1 = '该手机号已被注册';
          });
      }
    },
    onClickVerif () { // 获取验证码
      let phone = this.phone;
      if (phone === '') {
        this.errmsg1 = '手机号不能为空';
      } else {
        this.errmsg1 = '';
        axios
          .get('', { phone: phone })
          .then((response) => {
            Toast('验证码已发送');
          })
          .catch(function (error) {
            console.log(error);
            Toast('验证码发送失败,请重试');
          });
      }
    },
    onClicknext () { // 校验验证码,成功进行下一步,错误请重新输入
      let sms = this.sms;
      console.log(sms);
      axios
        .get('', { sms: sms })
        .then((response) => {
          this.contentPhone = false;
          this.contentPassword = true;
        })
        .catch((error) => {
          console.log(error);
          this.errmsg2 = '验证码不正确';
        });
    },
    onClicksubmit () { // 重置新密码
      let password = this.password;
      let phone = this.phone;
      axios
        .get('', {
          password: password,
          phone: phone
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
.van-cell__title {
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
