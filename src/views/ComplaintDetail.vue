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
      <div class="content-button">
        <van-button class="Acceptance" type="primary" @click="onClickAcceptance">受理</van-button>
        <van-button class="Close" type="primary" @click="onClickClose">关闭</van-button>
      </div>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import {
  NavBar,
  Button,
  Toast
}
  from 'vant';
export default {
  data () {
    return {

    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  methods: {
    onClickLeft () { // 返回上一层
      this.$router.go(-1);
    },
    onClickAcceptance () { // 处理投诉受理
      Toast('已受理');
    },
    onClickClose () { // 处理投诉关闭
      Toast('已关闭');
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
  font-size: 18px;
  text-indent: 27px;
  text-align: justify;
}
.content-button {
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
