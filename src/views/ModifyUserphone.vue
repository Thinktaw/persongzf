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
    <div class="newphone">
      <h2 class="van-doc-demo-block__title2">新手机号</h2>
      <van-cell-group>
        <van-field type="tel" maxlength="11" @blur="onblur" v-model="newphone" placeholder="请输入新手机号" ref="inputNewphone" />
        <div v-show="visiable1" class="content-errormessage">
            {{ errormessage1 }}
        </div>
      <h2 class="van-doc-demo-block__title2">获取验证码</h2>
      <van-field
      type="tel"
      maxlength="4"
      v-model="sms"
      center
      required
      clearable
      label="短信验证码"
      placeholder="请输入短信验证码"
      ref="inputVcode"
      >
      <van-button :disabled="ButtonShow" slot="button" size="small" type="primary" @click="onClickNewVerif">
        <span v-show="VerifShow">发送验证码</span>
        <span v-show="!VerifShow" >{{count}}s后再次获取</span>
      </van-button>
      </van-field>
      </van-cell-group>
      <van-button class="content-button" size="normal" type="primary" @click="onClicksubmit">更换手机号</van-button>
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
import axios from 'axios';
const TIME_COUNT = 60;
export default {
  data () {
    return {
      newphone: '',
      sms: '',
      count: '',
      timer: null,
      VerifShow: true,
      ButtonShow: false,
      inputNewphone: '',
      inputVcode: '',
      visiable1: false,
      errormessage1: ''
    };
  },
  methods: {
    onClickLeft () { // 返回上一层
      this.$router.go(-1);
    },
    onblur () { // 验证新手机号格式是否正确,号码是否被占用
      let newphone = this.$refs.inputNewphone.value;
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      console.log(newphone);
      if (newphone === '') {
        this.errormessage1 = '手机号不能为空';
        this.visiable1 = true;
      } else if (!reg.test(newphone)) {
        this.errormessage1 = '手机号格式不正确';
        this.visiable1 = true;
      } else {
        axios
          .get('', { newphone: newphone })
          .then((response) => {
            this.visiable1 = false;
            Toast('此手机号可以使用');
          })
          .catch((error) => {
            this.errormessage1 = '手机号已被占用';
            this.visiable1 = true;
            console.log(error);
          });
      }
    },
    onClickNewVerif () { // 获取新手机号验证码
      let newphone = this.$refs.inputNewphone.value;
      if (newphone === '') {
        Toast('请输入您的手机号');
      } else {
        axios
          .get('', { newphone: newphone })
          .then((response) => {
            this.count = TIME_COUNT;
            this.VerifShow = false;
            this.ButtonShow = true;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.VerifShow = true;
                this.ButtonShow = false;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);
            Toast('验证码已发送');
          })
          .catch((error) => {
            console.log(error);
            Toast('验证码发送失败,请重试');
          });
      }
    },
    onClicksubmit () { // 校验验证码
      let vCode = this.$refs.inputVcode.value;
      let newphone = this.$refs.inputNewphone.value;
      if (vCode === '' || newphone === '') {
        Dialog.alert({
          message: '请先将表格填写完整'
        }).then(() => {
          // on close
        });
      } else {
        axios
          .get('', { vCode: vCode })
          .then((response) => {
            Toast('手机号更换成功');
            this.$router.push({ path: '/ValidateUserphone' });
          })
          .catch(function (error) {
            console.log(error);
            Dialog.alert({
              message: '验证码错误!'
            }).then(() => {
              // on close
            });
          });
      }
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  }
};
</script>
<style rel="stylesheet">
.van-cell__title {
  font-size: 16px;
}
.van-nav-bar__text {
	font-size: 16px;
}
.van-doc-demo-block__title {
  text-align: left;
  margin: 0;
  font-weight: 400;
  font-size: 18px;
  color: rgba(69,90,100,.6);
  padding: 10px 15px 5px;
}
.content-userphone {
  text-align: left;
  margin: 0;
  font-weight: 400;
  font-size: 30px;
  color: #000000;
  padding: 5px 15px 15px;
}
.van-button {
  font-size: 16px;
}
.content-button {
  width: 90%;
  margin-top: 10px;
  font-size: 20px;
}
.van-doc-demo-block__title2 {
  text-align: left;
  margin: 0;
  font-weight: 400;
  font-size: 18px;
  color: rgba(69,90,100,.6);
  padding: 10px 15px 5px;
}
.content-errormessage {
	text-align: left;
	padding: 10px 15px 5px;
	color: #FF0000;
	font-size: 13px;
}
</style>
