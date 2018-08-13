<template>
    <div class="register">
        <form v-on:submit.prevent="submit">
         <van-cell-group> 
          <van-field 
           v-model="accountInfo.phone" 
           label="手机号"
            placeholder="请输入手机号" 
            clearable  
            required  
            left-icon="phone"
          /> 
          <van-field 
            center 
            clearable 
            v-model="accountInfo.sms" 
            label="验证码"
            placeholder="请输入验证码" 
            required
          > 
            <van-button slot="button" size="small" type="primary">发送验证码</van-button> 
          </van-field> 

         <van-field            
          v-model="accountInfo.password" 
            type="password" 
            label="密码"
            placeholder="请输入密码" 
            required 
          /> 
        </van-cell-group> 
        <van-button size="large"  type="danger">注册</van-button>
        </form>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { Field } from "vant"; //输入框
import { Cell, CellGroup } from "vant"; //cell单元格
import { Button } from "vant"; //按钮

Vue.use(Field);
Vue.use(Cell).use(CellGroup);
Vue.use(Button);

export default {
  name: "Register",
  data() {
    return {
      accountInfo: {
        phone: "",
        sms: "",
        password: ""
      }
    };
  },
  methods: {
    submit: function() {
      var formData = JSON.stringify(this.accountInfo);
      alert(formData);
      var url = this.baseUrl;
      // 把数据传到服务器后台
      axios
        .post(url + "/Account/Resiter", { formData: formData })
        .then(response => {
          console.log(response);
          this.oftenGoods = response.data;
          // 注册成功 跳转到主页
          this.$router.push({ path: '/' })
        })
        .catch(error => {
          console.log(error);
          alert("网络错误，不能访问");
        });
    }
  }
};
</script>

<style>
.register {
  padding: 15px;
}
</style>
