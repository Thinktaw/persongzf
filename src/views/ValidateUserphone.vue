<template>
    <div class="ValidateUserphone">
        <div class="nav">
            <van-nav-bar
            title="更换手机号"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        </div>
        <div class="content">
          <!-- 原手机号 -->
          <div class="oldphone">
            <h2 class="van-doc-demo-block__title">已绑定手机号</h2>
            <h2 class="content-userphone">{{ lockoldphone }}</h2>
            <h2 hidden="">{{ oldphone }}</h2>
            <van-cell-group>
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
              <van-button :disabled="ButtonShow" slot="button" size="small" type="primary" @click="onClickOldVerif">
                <span v-show="VerifShow">发送验证码</span>
                <span v-show="!VerifShow">{{count}}s后再次获取</span>
              </van-button>
            </van-field>
          </van-cell-group>
          <van-button class="content-button" size="normal" type="primary" @click="onClicksubmit">下一步</van-button>
          </div>
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
      sms: '',
      count: '',
      timer: null,
      oldphone: '',
      newphone: '',
      inputVcode: '',
      show: true,
      lockoldphone: '',
      VerifShow: true,
      ButtonShow: false
    };
  },
  mounted: function () {
    this.GetOldUserphone();
  },
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
    onClickLeft () { // 返回上一层
      this.$router.go(-1);
    },
    onClickOldVerif () { // 获取原手机验证码
      let oldphone = this.oldphone;
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
      console.log(oldphone);
      axios
        .get('', { oldphone: oldphone })
        .then((response) => {
          Toast('验证码已发送');
        })
        .catch(function (error) {
          console.log(error);
          Toast('验证码发送失败,请重试');
        });
    },
    GetOldUserphone () { // 获取原手机号信息
      axios
        .get('')
        .then((response) => {
          let oldphone = response.data.data.phone;
          let lockoldphone = oldphone.substr(0, 3) + '******' + oldphone.substr(9);
          this.oldphone = oldphone;
          this.lockoldphone = lockoldphone;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onClicksubmit () { // 验证用户输入的验证码
      let vCode = this.$refs.inputVcode.value;
      if (vCode === '') {
        Dialog.alert({
          message: '验证码不能为空'
        }).then(() => {
          // on close
        });
      } else {
        axios
          .get('', { vCode: vCode })
          .then((response) => {
            this.$router.push({ path: '/ModifyUserphone' });
          })
          .catch(function (error) {
            console.log(error);
            Toast('请输入正确的验证码');
          });
        console.log(vCode);
        Toast(vCode);
      }
    },
    onInput (value) {
      this.sms = value;
    },
    onDelete () {
      this.sms = '';
    }
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
</style>
