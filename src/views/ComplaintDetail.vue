<template>
  <div class="ComplaintDetail">
    <div class="nav">
      <van-nav-bar
      title="投诉建议"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <div class="content-title">
        投诉审核速度慢
      </div>
      <div class="content-detail">
        我那时真是聪明过分；也怕别人看见！到这边时；他先将橘子散放在地上；我与父亲不相见已二年余了；父亲和我都是东奔西走？须穿过铁道。”他望车外看了看，两脚再向上缩！
      </div>
      <div class="content-reply" v-show="contentreply" v-for="reply in list" :key="reply.replycotent">
        <span class="replytitle">{{ reply.username }}</span>:
        <span>{{ reply.replycotent }}</span>
      </div>
      <div class="content-button" v-show="buttonshow">
        <van-button class="Acceptance" type="primary" @click="onClickAcceptance">受理</van-button>
        <van-button class="Close" type="primary" @click="onClickClose">关闭</van-button>
        <div class="closereason">
          <van-dialog
            v-model="show"
            show-cancel-button
            :before-close="beforeclose"
          >
            <van-field
              v-model="reason"
              label="关闭原因"
              placeholder="请输入关闭原因"
              autosize
            />
          </van-dialog>
        </div>
      </div>
      <div class="content-replybutton" v-show="replyshow">
        <van-button class="Acceptance" type="primary" @click="onClickReply">回复</van-button>
      </div>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import {
  NavBar,
  Button,
  Toast,
  Dialog,
  Field
}
  from 'vant';
import axios from 'axios';
export default {
  data () {
    return {
      show: false,
      list: [
        {
          username: '官方回复',
          replycotent: '您的问题已解决了,对您的生活造成不便,我们十分抱歉'
        },
        {
          username: '官方回复',
          replycotent: '如果对我们的服务不满意,可以拨打热线xxx-xxxxx'
        }
      ],
      reason: '',
      buttonshow: true,
      replyshow: false,
      contentreply: true
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [Field.name]: Field
  },
  mounted: function () {
    this.GetComplaintStatus();
    this.GetComplaintReply();
  },
  methods: {
    onClickLeft () { // 返回上一层
      this.$router.go(-1);
    },
    onClickAcceptance () { // 投诉受理,修改投诉状态
      axios
        .post('')
        .then((response) => {
          this.buttonshow = false;
          this.replyshow = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onClickClose () { // 处理投诉关闭
      this.show = true;
    },
    beforeclose (action, done) { // 填写关闭原因
      let reason = this.reason;
      console.log(reason);
      if (action === 'confirm') {
        axios
          .post('', { reason: reason })
          .then((response) => {
            setTimeout(done, 700);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        done();
      }
    },
    onClickReply () { // 回复投诉
      Toast('回复');
    },
    GetComplaintStatus () { // 获取投诉状态
      axios
        .post('')
        .then((response) => { // 如果状态是受理中则显示回复按钮
          this.buttonshow = false;
          this.spanshow = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GetComplaintReply () { // 加载回复
      axios
        .get('')
        .then((response) => {
          let lens = response.data.data.length;
          for (let i = 0; i < lens; i++) {
            this.list.push(response.data.data[i]);
          }
          this.contentreply = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
</script>

<style rel="stylesheet">
.van-nav-bar__text {
  font-size: 16px;
}
.content {
  margin-left: 0px;
}
.content-title {
  margin-top: 20px;
  font-weight: 600;
  font-size: 24px;
  text-align: center;
}
.content-detail {
  width: 80%;
  margin: 0 auto;
  margin-top: 25px;
  margin-bottom: 15px;
  font-size: 18px;
  text-indent: 27px;
  text-align: justify;
}
.content-button {
  margin-top: 45px;
}
.content-reply {
  width: 80%;
  margin: 0 auto;
  text-align: justify;
  background-color: #E0E0E0;
}
.replytitle {
  font-size: 15px;
  color: #0080FF;
}
.content-replybutton {
  margin-top: 45px;
}
.Close {
  font-size: 16px;
  width: 30%;
  margin-left: 5px;
}
.Acceptance {
  font-size: 16px;
  width: 30%;
  margin-right: 5px;
}
</style>
