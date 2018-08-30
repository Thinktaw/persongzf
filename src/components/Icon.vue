<template>
  <i v-if="name !== ''" class="iconfont" :class="name" :style="style" @click="onClick"></i>
</template>

<script>

export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '25px'
    },
    color: {
      type: String,
      default: 'black'
    }
  },
  computed: {
    style: function () {
      return 'font-size:' + this.size + ';color:' + this.color + ';';
    }
  },
  methods: {
    onClick: function onClick (event) {
      if (!this.loading && !this.disabled) {
        this.$emit('click', event);
      }
    }
  }
};

</script>

<style scoped>
 @import url(//at.alicdn.com/t/font_783105_ax0ywo56ghi.css
);

i.iconfont {
  font-size: 18px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</stylesc>
