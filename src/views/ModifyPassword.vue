<template>
    <div class="ModifyName">
        <div class="nav">
            <van-nav-bar
            title="修改密码"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        </div>
        <form v-on:submit.prevent="submit">
            <div class="content">
                <h2 class="van-doc-demo-block__title">旧密码</h2>
                <van-cell-group>
                    <van-field type="password" class="content-cell" v-model="modifyinfo.Oldpassword" placeholder="请输入您的原始密码" />
                    </van-cell-group>
                    <div v-show="visiable1" class="content-errormessage">
                        {{ errormessage1 }}
                    </div>
                <h2 class="van-doc-demo-block__title">新密码</h2>
                <van-cell-group>
                    <van-field type="password" class="content-cell" v-model="modifyinfo.Newpassword" placeholder="请输入您的新密码" />
                </van-cell-group>
                    <div v-show="visiable2" class="content-errormessage">
                        {{ errormessage2 }}
                    </div>
                <h2 class="van-doc-demo-block__title">确认密码</h2>
                <van-cell-group>
                    <van-field type="password" class="content-cell" v-model="modifyinfo.AgainNewpassword" placeholder="请再次输入您的新密码" />
                </van-cell-group>
                    <div v-show="visiable3" class="content-errormessage">
                        {{ errormessage3 }}
                    </div>
                    <div class="content-button">
                        <van-button type="primary">确定</van-button>
                    </div>
            </div>
        </form>
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
      modifyinfo: {
        Oldpassword: '',
        Newpassword: '',
        AgainNewpassword: ''
      },
      errormessage1: '111',
      visiable1: false,
      errormessage2: '111',
      visiable2: false,
      errormessage3: '111',
      visiable3: false
    };
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
    onClickLeft () {
      Toast('返回');
    },
    submit: function () { // 提交表单
      // 对表单数据进行校验
      let formData = JSON.stringify(this.modifyinfo);
      console.log(formData);
      let Oldp = this.modifyinfo.Oldpassword;
      let Newp = this.modifyinfo.Newpassword;
      let ANewp = this.modifyinfo.AgainNewpassword;
      if (Oldp === '' || Newp === '' || ANewp === '') {
        Dialog.alert({
          message: '密码不能为空'
        }).then(() => {
          // on close
        });
      } else if (Newp !== ANewp) {
        this.errormessage3 = '两次密码输入不一致';
        this.visiable3 = true;
      } else {
        axios
          .get('', { formData: formData })
          .then((response) => {
            Dialog.alert({
              message: '修改成功'
            }).then(() => {
              // on close
            });
          }).catch(function (error) {
            console.log(error);
            this.errormessage1 = '旧密码输入错误,请重试';
          });
        this.visiable3 = false;
      }
    }
  }
};
</script>

<style rel="stylesheet">
.van-nav-bar__text {
	font-size: 16px;
}
.van-doc-demo-block__title {
	text-align: left;
    margin: 0;
    font-weight: 400;
    font-size: 15px;
    color: rgba(69,90,100,.6);
    padding: 10px 15px 15px;
}
.content-errormessage {
	text-align: left;
	padding: 10px 15px 5px;
	color: #FF0000;
	font-size: 13px;
}
.content-cell {
	text-align: left;
	font-size: 13px;

}
.content-button {
	margin-top: 20px;
}
.van-button {
	width: 90%;
	font-size: 15px;
}
.van-dialog__footer {
  text-align: center;
}
.van-dialog__confirm {
  width: 100%;
}
</style>
