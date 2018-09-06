<template>
  <div class="Complaint">
    <div class="nav">
      <van-nav-bar
      title="建议"
      left-text="返回"
      fixed
      :z-index="zindex"
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
          <div class="AdviseDetail" >
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
              <div class="sendreply">
                <van-cell-group>
                  <van-field v-model="commentvalue" type="textarea" placeholder="写回复" />
                </van-cell-group>
                <van-button class="sendbutton" size="small" type="default" @click="onClickSend(reply)">发送</van-button>
              </div>
              <div class="replyinfo">
              <div class="Sharp"></div>
                <van-list
                  v-model="reloading"
                  :finished="refinished"
                >
                    <div class="content-reply" v-for="reply in replylist" :key="reply.Adviseid">
                      <span class="replytitle">官方回复</span>:
                      <span>{{ reply.commentcontent }}</span>
                    </div>
                  </van-list>
                </div>
            </van-popup>
          </div>
        </div>
      </van-list>
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
  Toast,
  List,
  Field,
  Button,
  Popup
}
  from 'vant';
import axios from 'axios';
import Footer from '../components/Footer.vue';
export default {
  data () {
    return {
      show: false,
      zindex: 999,
      commentvalue: '',
      loading: false,
      reloading: false,
      finished: false,
      refinished: false,
      adviselist: [],
      adviseitem: [],
      replylist: [],
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
    [Popup.name]: Popup,
    Footer
  },
  methods: {
    onClickLeft () { // 返回上一层
      this.$router.go(-1);
    },
    onLoadAdvise () { // 加载建议列表
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
    onClickComment (adviseitem) { // 弹出回复内容,加载回复列表
      let Adviseid = adviseitem.Adviseid;
      console.log(Adviseid);
      this.show = true;
      axios
        .get('/api/replyinfo', { Adviseid: Adviseid })
        .then((response) => {
          let lens = response.data.data.commentcount;
          if (this.replylist.length === 0) {
            setTimeout(() => {
              for (let i = 0; i < lens; i++) {
                this.replylist.push(response.data.data.comment[i]);
              }
              this.reloading = false;
              if (this.replylist.length >= lens) {
                this.refinished = true;
              }
            }, 500);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onClickSend (reply) { // 评论事件(只能官方回复)
      let Adviseid = reply.Adviseid;
      let commentvalue = this.commentvalue;
      console.log(Adviseid);
      let usertype = ''; // 获取用户类型
      if (usertype === 0) {
        Toast('您没有权限进行回复');
      } else {
        axios
          .post('', {
            Adviseid: Adviseid,
            commentvalue: commentvalue
          })
          .then((response) => {
            Toast('回复成功');
          })
          .catch((error) => {
            console.log(error);
            this.commentvalue = '';
            Toast('回复失败,请重试!');
          });
      }
    },
    onClickLike (adviseitem) { // 点赞事件
      let Adviseid = adviseitem.Adviseid;
      console.log(Adviseid);
      axios
        .post('', { id: Adviseid })
        .then((response) => { // 改变该条建议的like状态
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
  margin-top: 55px;
  margin-bottom: 45px;
}
.replytitle {
  font-size: 15px;
  color: #0080FF;
}
.content-reply {
  width: 80%;
  text-align: justify;
  margin-left: 15px;
  padding-bottom: 5px;
}
.replyinfo {
  border:1px solid #ADADAD;
  border-radius: 5px;
}
.Sharp {
  width:15px;
  height:15px;
  border:1px solid #ADADAD;
  position:relative;
  transform:rotate(45deg);
  background-color: #F0F0F0;
  border-bottom: none;
  border-right: none;
  left:145px;
  top:-7px;
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
  margin-right: 10px;
  font-size: 14px;
  color: #8E8E8E;
}
.van-popup {
  background-color: #F0F0F0;
}
.van-cell-group {
  width: 80%;
  margin-top: 7px;
  margin-left: 15px;
  margin-bottom: 15px;
}
.sendreply {
  position: relative;
}
.sendbutton {
  position: absolute;
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
