<template>
	<div class="AddInternalUser">
		<div class="nav">
			<van-nav-bar
			class="nav-bar"
			title="添加内部账户"
			left-text="返回"
			right-text="保存"
			left-arrow
			@click-left="onClickLeft"
			@click-right="onClickRight"
			/>
		</div>
		<div class="content">
			<form v-on:submit.prevent="click-right">
				<van-cell-group>
					<van-field
					class="content-field"
					v-model="userinfo.uname"
					clearable
					label="姓名"
					placeholder="请输入您的姓名"
					ref="inputname"
					required
					/>

					<van-field
					type="tel"
					class="content-field"
					v-model="userinfo.uphone"
					clearable
					label="电话"
          maxlength="11"
					placeholder="请输入您的电话"
					ref="inputphone"
					required
					/>
					<van-actionsheet v-model="show" :actions="sexactions" cancel-text="取消" />
					<van-cell ref="inputusersex" required class="content-cell" title="性别" is-link :value="userinfo.usex" @click="ShowSexList"/>
				</van-cell-group>
			</form>
		</div>
	</div>
</template>

<script type="ecmascript-6">
import {
  NavBar,
  Cell,
  CellGroup,
  Field,
  Radio,
  RadioGroup,
  Toast,
  Actionsheet,
  Dialog
}
  from 'vant';
import axios from 'axios';
export default {
  data () {
    return {
      show: false,
      userinfo: {
        uname: '',
        uphone: '',
        usex: ''
      },
      radio: '',
      notcie: '',
      sexactions: [
        {
          name: '男',
          callback: this.onClick
        },
        {
          name: '女',
          callback: this.onClick
        }]
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Actionsheet.name]: Actionsheet,
    [Dialog.name]: Dialog
  },
  methods: {
    onClickLeft () {
      // 返回上一级
      this.$router.push({ path: '/InternalUser' });
    },
    onClickRight: function () {
      // 获取用户输入信息
      let username = this.$refs.inputname.value;
      let userphone = this.$refs.inputphone.value;
      let usersex = this.$refs.inputusersex.value;
      var formData = JSON.stringify(this.userinfo);
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      let reg1 = /^[\u4E00-\u9FA5]{1,6}$/;
      // 判断用户是否填写表单
      if (username === '' || userphone === '' || usersex === '') {
        Dialog.alert({
          message: '请填写完整再保存'
        }).then(() => {
          // on close
        });
      } else if (!reg1.test(username)) {
        Dialog.alert({
          message: '您输入的姓名格式有误'
        }).then(() => {
          // on close
        });
      } else if (!reg.test(userphone)) {
        Dialog.alert({
          message: '请填写正确的手机号格式'
        }).then(() => {
          // on close
        });
      } else { // 提交数据
        axios
          .get(
            '/api/Adduser',
            { formData: formData })
          .then((response) => {
            Dialog.alert({
              message: '保存成功'
            }).then(() => {
              // on close
              this.$router.push({ path: '/InternalUser' });
            });
          }).catch(function (error) {
            Dialog.alert({
              message: '访问失败'
            }).then(() => {
              // on close
            });
            console.log(error);
          });
      }
    },
    ShowSexList (item) {
      this.show = true;
    },
    onClick (item) {
      this.userinfo.usex = item.name;
      this.show = false;
    }
  }
};

</script>

	<style rel="stylesheet">
	.van-nav-bar__text {
		font-size: 16px;
	}

	.content-cell {
		text-align: left;
		font-size: 16px;

	}

	.content-field {
		text-align: left;
		height: 45px;
		font-size: 16px;
	}
	</style>
