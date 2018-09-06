<template>
  <div class="Complaint">
    <div class="nav">
      <van-nav-bar
      title="投诉"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoadComplaint"
        >
        <div class="ComplaintAdvise" @click="OnClickComplainDetail(complaintitem)" v-for="complaintitem in complaintlist" :key="complaintitem.value">
          <div class="titlename">
            {{ complaintitem.titlename }}
          </div>
          <div class="contentinfo">
            {{ complaintitem.contentinfo }}
          </div>
          <div v-if="complaintitem.status==1" class="status">
            受理中
          </div>
        </div>
      </van-list>
      <div class="search">
        <icon :size="'40px'" :color="'#0080FF'" :name="search" @click="onClickSearch"/>
      </div>
      <div class="popup">
        <van-actionsheet
          v-model="popupshow"
          :actions="actions"
          cancel-text="取消"
         />
      </div>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import {
  NavBar,
  CellGroup,
  Cell,
  Tab,
  Tabs,
  Toast,
  Icon,
  List,
  Actionsheet,
  Button
}
  from 'vant';
import Footer from '../components/Footer.vue';
import axios from 'axios';
export default {
  data () {
    return {
      popupshow: false,
      loading: false,
      finished: false,
      complaintlist: [],
      complaintitem: [],
      search: 'icon-search',
      actions: [
        {
          name: '待处理',
          callback: this.onClickUntreated
        },
        {
          name: '处理中',
          callback: this.onClickTreatting
        },
        {
          name: '已处理',
          callback: this.onClickClosed
        }
      ]
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [List.name]: List,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Toast.name]: Toast,
    [Actionsheet.name]: Actionsheet,
    [Button.name]: Button,
    [Icon.name]: Icon,
    Footer
  },
  methods: {
    onClickLeft () { // 返回上一层
      this.$router.go(-1);
    },
    onClickSearch () { // 设置过滤条件(1--待受理  2--受理中)
      this.popupshow = true;
    },
    onClickUntreated () { // 筛选未受理的投诉列表
      let Tstatus = 0;
      axios
        .post('', { Tstatus: Tstatus })
        .then((response) => {
          let lens = response.data.data.length;
          setTimeout(() => {
            for (let i = 0; i < lens; i++) {
              this.complaintlist.push(response.data.data[i]);
            }
            this.loading = false;
            if (this.complaintlist.length >= lens) {
              this.finished = true;
            }
          }, 500);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onClickTreatting () { // 筛选受理中的投诉列表
      let Tstatus = 1;
      axios
        .post('', { Tstatus: Tstatus })
        .then((response) => {
          let lens = response.data.data.length;
          setTimeout(() => {
            for (let i = 0; i < lens; i++) {
              this.complaintlist.push(response.data.data[i]);
            }
            this.loading = false;
            if (this.complaintlist.length >= lens) {
              this.finished = true;
            }
          }, 500);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onClickClosed () { // 筛选已关闭的投诉列表
      let Tstatus = 2;
      axios
        .post('', { Tstatus: Tstatus })
        .then((response) => {
          let lens = response.data.data.length;
          setTimeout(() => {
            for (let i = 0; i < lens; i++) {
              this.complaintlist.push(response.data.data[i]);
            }
            this.loading = false;
            if (this.complaintlist.length >= lens) {
              this.finished = true;
            }
          }, 500);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onLoadComplaint () { // 加载投诉列表
      axios
        .get('/api/Complaininfo')
        .then((response) => {
          let lens = response.data.data.length;
          setTimeout(() => {
            for (let i = 0; i < lens; i++) {
              this.complaintlist.push(response.data.data[i]);
            }
            this.loading = false;
            if (this.complaintlist.length >= lens) {
              this.finished = true;
            }
          }, 500);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    OnClickComplainDetail (complaintitem) { // 跳转到投诉详情页面
      let Complainid = complaintitem.Complainid;
      this.$router.push({
        path: './ComplaintDetail',
        query: {
          Complainid: Complainid
        }
      });
    }
  }
};
</script>

<style rel="stylesheet">
.van-icon {
  font-size: 16px;
}
.van-nav-bar__text {
  font-size: 16px;
}
.van-cell {
  height: 45px;
}
.van-cell__title {
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
.content {
  margin-top: 55px;
  margin-bottom: 45px;
}
.search {
  position: fixed;
  bottom: 75px;
  right: 25px;
}
.ComplaintAdvise {
  height: 90px;
  position: relative;
  border-bottom: 2px solid;
  border-color: #eee;
  padding-bottom: 20px;
}
.status {
  margin: 15px 5px 8px;
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
  margin-right: 10px;
  font-size: 14px;
  color: #8E8E8E;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
