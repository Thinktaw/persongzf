<template>
  <div class="RetrievePassword">
    <div class="nav">
      <van-nav-bar
      title="找回密码"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <div class="content-usephone">
        <van-cell-group>
          <van-cell title="通过手机找回" is-link @click="onClickUsephone"/>
        </van-cell-group>
      </div>
      <div class="content-useemail">
        <van-cell-group>
          <van-cell title="通过邮箱找回" is-link @click="onClickUseemail"/>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import {
  NavBar,
  CellGroup,
  Cell
}
  from 'vant';
export default {
  data () {
    return {

    };
  },
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1);
    },
    onClickUsephone () {
      this.$router.push();
    },
    onClickUseemail () {
      this.$router.push();
    }
  }
};
</script>

<style rel="stylesheet">
.van-nav-bar__text {
	font-size: 16px;
}
.content-usephone {
    margin-top: 15px;
}
.content-useemail{
	margin-top: 15px;
}
.van-cell {
	text-align: left;
	padding-left: 18px;
	height: 50px;
	font-size: 15px;
}
</style>
