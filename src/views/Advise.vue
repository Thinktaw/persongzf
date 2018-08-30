<template>
  <div class="Complaint">
    <div class="nav">
      <van-nav-bar
      title="建议"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoadAdvise"
        >
        <div class="Advise" v-for="adviseitem in adviselist" :key="adviseitem.value">
          <div class="AdviseDetail" @click="OnClickAdviseDetail(adviseitem)">
            <div class="titlename">
              {{ adviseitem.titlename }}
            </div>
            <div class="contentinfo">
              {{ adviseitem.contentinfo }}
            </div>
          </div>
          <div class="commentAndlike">
            {{ adviseitem.comment.commentcontent }}
            <van-button class="comment" size="normal" type="primary" plain @click="onClickComment(adviseitem)">
              <icon :size="'20px'" :name="comment"/>  回复({{ adviseitem.commentcount }})
            </van-button>
            <van-button class="like" size="normal" type="primary" plain @click="onClickLike(adviseitem)">
              <icon :size="'20px'" v-if="adviseitem.like==1" :name="like" :color="likecolor"/>
              <icon :size="'20px'" v-if="adviseitem.like==0" :name="unlike"/>  点赞
            </van-button>
          </div>
          <div class="popup">
            <van-popup v-model="show" position="bottom" :overlay="true">
              <van-cell-group>
                <van-field v-model="commentvalue" type="textarea" placeholder="写回复" />
              </van-cell-group>
              <van-button class="sendbutton" size="small" type="default">发送</van-button>
            </van-popup>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import {
  NavBar,
  CellGroup,
  Cell,
  Toast,
  List,
  Field,
  Button,
  Popup
}
  from 'vant';
import axios from 'axios';
export default {
  data () {
    return {
      show: false,
      commentvalue: '',
      loading: false,
      finished: false,
      adviselist: [],
      adviseitem: [],
      like: 'icon-home_ico_like-',
      unlike: 'icon-like',
      likecolor: '#d81e06',
      comment: 'icon-comment'
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [List.name]: List,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Popup.name]: Popup
  },
  methods: {
    onClickLeft () { // 返回上一层
      this.$router.go(-1);
    },
    onLoadAdvise () {
      axios
        .get('/api/Adviseinfo')
        .then((response) => {
          let lens = response.data.data.length;
          setTimeout(() => {
            for (let i = 0; i < lens; i++) {
              this.adviselist.push(response.data.data[i]);
            }
            this.loading = false;
            if (this.adviselist.length >= lens) {
              this.finished = true;
            }
          }, 500);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    OnClickAdviseDetail (adviseitem) { // 加载建议列表
      let titlename = adviseitem.titlename;
      console.log(titlename);
      this.$router.push({
        path: './AdviseDetail',
        query: {
          titlename: titlename
        }
      });
    },
    onClickComment () { // 评论事件
      this.show = true;
      axios
        .get('/api/Adviseinfo')
        .then((response) => {
          console.log(response.data.data[0].comment[0].commentcontent);
          console.log(response.data.data[0].comment[1].commentcontent);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onClickLike (adviseitem) { // 点赞事件
      let Adviseid = adviseitem.Adviseid;
      console.log(Adviseid);
      axios
        .post('', { id: Adviseid })
        .then((response) => { // 改变改条建议的like状态
          // if (adviseitem.like === 0) {
          //   adviseitem.like = 1;
          // } else {
          //   adviseitem.like = 0;
          // }
          Toast('点赞成功');
        })
        .catch(function (error) {
          console.log(error);
          Toast('点赞失败,请重试');
        });
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
.content {
  margin-bottom: 45px;
}
.Advise {
  position: relative;
  border-bottom: 2px solid;
  border-color: #eee;
  padding-bottom: 0px;
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
.van-popup {
  background-color: #F0F0F0;
}
.van-cell-group {
  width: 80%;
  margin-top: 7px;
  margin-left: 15px;
  float: left;
}
.sendbutton {
  position: fixed;
  right: 0px;
  bottom: 0px;
  background-color: #F0F0F0;
  border: 0;
  padding-left: 1px;
}
.van-button {
  border-radius: 0px;
}
.van-button__text {
  font-size: 16px;
  color: #000000;
}
.van-button--primary {
  border: 1px solid #F0F0F0;
  background-color: #F7F7F7;
}
.commentAndlike {
  margin-top: 10px;
}
.comment {
  float: left;
  width: 50%;
}
.like {
  width: 50%;
}
</style>
