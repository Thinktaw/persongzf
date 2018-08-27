<template>
  <div class="ComplaintAndAdvise">
    <div class="nav">
      <van-nav-bar
      title="投诉建议"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      />
    </div>
    <div class="Tab">
      <van-tabs v-model="active">
        <van-tab title="投诉">
          <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          >
          <div class="Complaint" @click="OnClickDetail" v-for="Item in list" :key="Item">
            <div class="titlename">
              投诉审核速度慢
            </div>
            <div class="contentinfo">
              年初提交的租房申请，现在已经过去了半年了，工作人员不给我任何回复
              年初提交的租房申请，现在已经过去了半年了，工作人员不给我任何回复
              年初提交的租房申请，现在已经过去了半年了，工作人员不给我任何回复
            </div>
            <div class="status" v-show="buttonshow">
              <span>受理中</span>
            </div>
          </div>
          </van-list>
        </van-tab>
        <van-tab title="建议">
          <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          >
          <div class="Complaint" @click="OnClickDetail" v-for="Item in list" :key="Item">
            <div class="titlename">
              建议开通水费网上缴费功能
            </div>
            <div class="contentinfo">
              建议开通水费网上缴费功能，方便人民群众。一站式解决租房所有的费用相关问题
            </div>
          </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import {
  NavBar,
  Tab,
  Tabs,
  Toast,
  List,
  Button
}
  from 'vant';
import Footer from '../components/Footer.vue';
export default {
  data () {
    return {
      active: 2,
      loading: false,
      finished: false,
      list: [],
      buttonshow: true
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Toast.name]: Toast,
    [Button.name]: Button,
    Footer
  },
  mounted: function () {
    this.GetComplaintStatus();
  },
  methods: {
    onClickLeft () { // 返回上一层
      this.$router.go(-1);
    },
    OnClickDetail () { // 跳转到投诉详情页面
      this.$router.push({ path: './ComplaintDetail' });
    },
    onLoad () { // 加载投诉列表
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 20) {
          this.finished = true;
        }
      }, 500);
    },
    GetComplaintStatus () { // 获取投诉列表状态(受理中)

    }
  }
};
</script>

<style rel="stylesheet">
.van-nav-bar__text {
  font-size: 16px;
}
.van-ellipsis {
  font-size: 16px;
}
.van-tab--active {
  color: #38f;
}
.van-tabs__line {
  background-color: #38f;
}
.Tab {
  margin-bottom: 45px;
}
.Complaint {
  height: 90px;
  position: relative;
  border-bottom: 2px solid;
  border-color: #eee;
  padding-bottom: 20px;
}
.status {
  margin-top: 15px;
  margin-bottom: 8px;
  position: absolute;
  bottom: 0;
  right: 0;
  color: #ADADAD;
}
.titlename {
  text-align: left;
  margin-top: 10px;
  margin-left: 30px;
  font-size: 20px;
}
.contentinfo {
  text-align: left;
  margin-top: 10px;
  margin-left: 30px;
  font-size: 14px;
  color: #8E8E8E;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
