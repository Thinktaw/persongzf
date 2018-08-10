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
        <div class="content">
          <div class="oldphone">
            <h2 class="van-doc-demo-block__title">已绑定手机号</h2>
            <h2 class="content-userphone">{{ oldphone }}</h2>
            <van-cell-group>
              <van-field
              type="tel"
              maxlength="4"
              v-model="sms"
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
              ref="inputVcode"
              >
              <van-button slot="button" size="small" type="primary" @click="onClickVerification">发送验证码</van-button>
            </van-field>
          </van-cell-group>
          <van-button class="content-button" size="normal" type="primary" @click="onClicksubmit">更换手机号</van-button>
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
export default {
  data () {
    return {
      sms: '',
      oldphone: '',
      inputVcode: '',
      show: true
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
      Toast('返回');
    },
    onClickVerification () { // 获取原手机验证码
      Toast('验证码');
      axios
        .get('')
        .then((response) => {
          Toast('验证码已发送');
        })
        .catch(function (error) {
          console.log(error);
          Toast('验证码发送失败,请重试');
        });
    },
    GetOldUserphone () { // 获取原手机号信息
      let oldphone = '18437963657';
      let lockphone = oldphone.substr(0, 3) + '******' + oldphone.substr(9);
      this.oldphone = lockphone;
    },
    onClicksubmit () { // 验证用户输入的验证码
      let vCode = this.$refs.inputVcode.value;
      let reg = /^[\d]+$/g;
      if (vCode === '') {
        Dialog.alert({
          message: '验证码不能为空'
        }).then(() => {
          // on close
        });
      } else if (!reg.test(vCode)) {
        Dialog.alert({
          message: '验证码格式不正确'
        }).then(() => {
          // on close
        });
      } else {
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
</style>
