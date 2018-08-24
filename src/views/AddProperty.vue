<template>
  <div class="AddProperty">
    <div class="nav">
      <van-nav-bar
      class="nav-bar"
      title="新建物业 "
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      />
    </div>
    <div class="content">
      <van-cell-group>
        <van-cell
        required
        class="field"
        value="负责项目"
        is-link
        @click="showTypeList"
        />
      <van-popup v-model="show" position="bottom">
        <van-picker
        show-toolbar
        title="负责项目"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        ref="inputColumns"
        />
        </van-popup>
        <van-field
        class="field"
        v-model="addProperty.Rtype"
        clearable
        readonly
        ref="inputRtype"
        />
        <van-field
        class="field"
        v-model="addProperty.Leadername"
        required
        clearable
        label="负责人"
        placeholder="请输入负责人姓名"
        ref="inputName"
        />
        <van-field
        class="field"
        v-model="addProperty.Propertyname"
        required
        clearable
        label="物业名称"
        placeholder="请输入物业名称"
        ref="inputPropertyname"
        />
        <van-field
        class="field"
        v-model="addProperty.Phone"
        required
        clearable
        label="联系电话"
        placeholder="请输入联系电话"
        ref="inputPhone"
        :error-message="errmsg1"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import {
  NavBar,
  CellGroup,
  Cell,
  Popup,
  Field,
  Picker,
  Toast,
  Dialog
}
  from 'vant';
import axios from 'axios';
export default {
  data () {
    return {
      show: false,
      columns: [
        '德馨苑小区',
        '明湖城小区',
        '天河盛世小区'
      ],
      addProperty: {
        Rtype: '',
        Leadername: '',
        Propertyname: '',
        Phone: ''
      },
      errmsg1: ''
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  methods: {
    onClickLeft () { // 返回上一级
      this.$router.go(-1);
    },
    onClickRight () { // 验证用户输入,输入无误,提交到后台进行保存
      let formData = JSON.stringify(this.addProperty);
      let Rtype = this.addProperty.Rtype;
      let name = this.addProperty.Leadername;
      let propertyname = this.addProperty.Propertyname;
      let phone = this.addProperty.Phone;
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      console.log(formData);
      if (Rtype === '' || name === '' || propertyname === '' || phone === '') {
        Dialog.alert({
          message: '请填写完整在保存!'
        }).then(() => {
          // on close
        });
      } else if (!reg.test(phone)) {
        this.errmsg1 = '手机号格式不正确';
      } else {
        this.errmsg1 = '';
        axios
          .get('', { formData: formData })
          .then((response) => {
            Dialog.alert({
              message: '保存成功!'
            }).then(() => {
              // on close
            });
          })
          .catch(function (error) {
            console.log(error);
            Dialog.alert({
              message: '保存失败,请重试!'
            }).then(() => {
              // on close
            });
          });
      }
    },
    showTypeList () { // 显示列表
      this.show = true;
    },
    onCancel () { // 隐藏列表
      this.show = false;
    },
    onConfirm (value, index) { // 处理列表点击事件
      this.addProperty.Rtype = value;
      this.show = false;
    }
  }
};
</script>

<style rel="stylesheet">
.van-nav-bar__text {
  font-size: 16px;
}
.van-cell__value {
  margin-left: 12px;
  font-size: 16px;
}
.van-cell__title {
  font-size: 16px;
}
</style>
