<template>
  <div class="PropertyList">
    <div class="nav">
      <van-nav-bar
      class="nav-bar"
      title="物业档案"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      >
        <icon :size="'16px'" :color="'#0080FF'" :name="option" @click="onClickOption" slot="right"/>
      </van-nav-bar>
    </div>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <van-row
        class="userinfo"
		v-for="propertyitem in list"
		:key="propertyitem.value"
		>
          <van-col span="10">
            <div class="Name">
              {{ propertyitem.propertyname }}
            </div>
            <div class="span10">
              家庭成员：{{ propertyitem.propertyfamily }} 人
            </div>
            <div class="span10">
              享受低保：{{ propertyitem.propertyGuarantee }}
            </div>
            <div class="span10">
              户  籍  地：{{ propertyitem.propertyAddress }}
            </div>
          </van-col>
          <van-col span="12">
            <div class="Phone">
              {{ propertyitem.propertyphone }}
            </div>
            <div class="span12">
              入住时间：{{ propertyitem.propertycheckin }}
            </div>
            <div class="span12">
              家庭年收入：{{ propertyitem.propertyincome }}
            </div>
          </van-col>
          <van-col span="2">
            <div class="span2">
              <icon :size="'29px'" :color="'#D0D0D0'" :name="Right" @click="onClickDetail" />
            </div>
          </van-col>
        </van-row>
      </van-list>
    </div>
    <div class="Footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import {
  NavBar,
  CellGroup,
  Cell,
  Row,
  Col,
  Field,
  Toast,
  List,
  Dialog
}
  from 'vant';
import Footer from '../components/Footer.vue';
import axios from 'axios';
export default {
  data () {
    return {
      option: 'icon-option',
      list: [],
      loading: false,
      finished: false,
      Right: 'icon-right'
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Row.name]: Row,
    [Col.name]: Col,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [List.name]: List,
    [Dialog.name]: Dialog,
    Footer
  },
  methods: {
    onClickLeft () {
      Toast('返回');
    },
    onClickOption () {
      Toast('弹窗');
    },
    onLoad () { // 列表加载事件
      setTimeout(() => {
        axios.get('/api/propertyinfo').then((response) => {
          let lens = response.data.data.length;
          console.log(response.data);
          for (let i = 0; i < lens; i++) {
            this.list.push(response.data.data[i]);
          }
          this.loading = false;
          if (this.list.length >= lens) {
            this.finished = true;
          }
        }).catch(function (error) {
          console.log(error);
          this.noneuser = true;
          this.userlist = false;
          Dialog.alert({
            message: '网络错误'
          }).then(() => {
            // on close
          });
        });
      }, 700);
    },
    onClickDetail () {

    }
  }
};
</script>

<style rel="stylesheet">
.van-nav-bar__text {
  font-size: 16px;
}
.content {
  margin-top: 50px;
  padding-bottom: 45px;
}
.Name {
  color: #000000;
  margin-top: 5px;
  font-size: 24px;
}
.Phone {
  color: #000000;
  margin-top: 5px;
  font-size: 21px;
}
.span10 {
  margin-top: 5px;
  margin-bottom: 5px;
}
.span12 {
  margin-top: 2px;
}
.span2 {
  margin-top: 36px;
}
.userinfo {
  height: 120px;
  border-bottom: 1px #D0D0D0 solid;
}
.van-col--10 {
  text-align: left;
  color: #6B6B6B;
  padding-left: 22px;
}
.van-col--12 {
  text-align: left;
  color: #6B6B6B;
  padding-left: 8px;
}
</style>
