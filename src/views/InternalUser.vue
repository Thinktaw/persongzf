<template>
	<div class="InternalUser">
		<div class="nav">
			<van-nav-bar class="nav-bar" title="内部账户管理" left-text="返回" right-text="☰" left-arrow @click-left="onClickLeft" @click-right= "onClickRight" />
        </div>
        <div class="content">
			<van-popup v-model="show" position="left" :overlay="true">
				<van-nav-bar
				class="popupcontent"
				title="人员过滤"
                />
				<van-cell-group>
					<van-field
					class="content-field"
					v-model="Searchusername"
					clearable
					label="姓名"
					placeholder="请输入您的姓名"
					ref="inputname"
					/>

					<van-field
					type="tel"
					class="content-field"
					v-model="Searchuserphone"
					clearable
					label="电话"
					placeholder="请输入您的电话"
					ref="inputphone"
					/>
				</van-cell-group>
				<div class="button">
					<van-button type="primary" @click="onClickSearch">确定</van-button>
				</div>
			</van-popup>
			<div v-show="noneuser" class="none-userlist">
				<img src="../gzf-icon/error.png"><br><br>
				<span>~没有找到您想要的信息~</span>
			</div>
			<div v-show="userlist" class="userlist">
				<van-list
				v-model="loading"
				:finished="finished"
				@load="onLoad"
				>
				<van-row
				class="userinfo"
				v-for="item in list"
				:key="item.value"
				>
				<van-col span="8">
					<img src="../gzf-icon/default-profile.png">
				</van-col>
				<van-col span="12">
					<div class="name">
						{{ item.username }}
					</div>
					<div class="phone">
						{{ item.userphone }}
					</div>
					<div class="position">
						{{ item.job }}
					</div>
				</van-col>
				<van-col span="4">
					<img src="../gzf-icon/more_if.png" @click="onClickmore">
				</van-col>
			</van-row>
		</van-list>
		<van-dialog v-model="Dialogshow" :show-confirm-button="false"
		:close-on-click-overlay="true"
		>
		<van-cell-group>
			<van-cell title="分配权限" @click="onClickJurisdiction"/>
			<van-cell :type="Bannum" title="停用" @click="onClickBan"/>
		</van-cell-group>
	</van-dialog>
</div>
</div>
<div class="add">
	<img src="../gzf-icon/add.png" @click="onClickImg">
</div>
<div class="footer">
	<Footer></Footer>
</div>
</div>
</template>

<script type="ecmascript-6">
import Footer from '../components/Footer.vue';
import {
  NavBar,
  Popup,
  Cell,
  CellGroup,
  Field,
  Button,
  Toast,
  Row,
  Col,
  List,
  Dialog
}
  from 'vant';
import axios from 'axios';
import Vue from 'vue';
Vue.use(Dialog);
export default {
  data () {
    return {
      Dialogshow: false,
      username: '',
      phone: '',
      list: [],
      loading: false,
      finished: false,
      imgurl: '../gzf-icon/default-profile.png',
      show: false,
      Bannum: 1,
      noneuser: false,
      userlist: true,
      Searchusername: '',
      Searchuserphone: ''
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Row.name]: Row,
    [Col.name]: Col,
    [List.name]: List,
    [Dialog.name]: Dialog,
    Footer
  },
  methods: {
    onClickmore () { // 用户列表右侧点击事件
      this.Dialogshow = true;
    },
    onClickJurisdiction () { // 分配权限
      this.$router.push({ path: '' });
    },
    onClickBan () { // 停用
      let ban = this.Bannum;
      axios.get('', { ban: ban }).then((response) => {
        Toast('操作成功');
      }).catch(function (error) {
        console.log(error);
        Toast('操作失败');
      });
    },
    onClickRight () { // 导航栏右侧点击事件
      this.show = true;
    },
    onClickLeft () { // 导航栏左侧点击事件
    },
    onClickSearch () { // 弹出层搜索点击事件
      let Searchusername = this.Searchusername;
      let Searchuserphone = this.Searchuserphone;
      this.list = [];
      this.show = false;
      axios
        .get('/api/userinfo', {
          username: Searchusername,
          userphone: Searchuserphone
        })
        .then((response) => {
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
          Dialog.alert({
            message: '访问失败'
          }).then(() => {
            // on close
          });
        });
    },
    onClickImg () { // 点击添加用户事件
      this.$router.push({ path: '/AddInternalUser' });
    },
    onLoad () { // 列表加载事件
      setTimeout(() => {
        axios.get('/api/userinfo').then((response) => {
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
          Dialog.alert({
            message: '网络错误'
          }).then(() => {
            // on close
          });
        });
      }, 700);
    }
  }
};
</script>

<style rel="stylesheet">
.van-nav-bar__text {
	font-size: 16px;
}

.none-userlist{
	height: 100%;
	padding-top: 50px;
	text-align: center;
	background-color: #fff;
}

.van-popup--left {
	width: 70%;
	height: 100%;
}

.popupcontent {
	text-align: left;

}

.van-cell__title{
	text-align: left;
}

.button{
	margin-left: 33%;
	position: fixed;
	bottom: 40px;
}

.van-button {
	width: 100px;
}

.content-field {
	height: 45px;
	font-size: 16px;
}

.add {
	position: fixed;
	bottom: 75px;
	right: 25px;
}

.userinfo {
	margin-bottom: 5px;
	background-color: #fff;
	border-bottom: 2px solid;
	border-color: #eee;
}

.userlist {
	padding-bottom: 45px;
}

.van-col--12 {
	margin-top: 10px;
	margin-bottom: 10px;
	text-align: left;
}

.name {
	font-size: 25px;
}

.phone {
	margin-top: 7px;
	margin-bottom: 7px;
	color: #BEBEBE;
}

.position {
	color: #BEBEBE;
}

.van-col--8 {
	text-align: left;
	padding-left: 20px;
	margin-top: 23px;
}

.van-col--4 {
	margin-top: 40px;
}
</style>
