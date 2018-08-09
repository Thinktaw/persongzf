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
      default: '48px'
    }
  },
  computed: {
    style: function () {
      return 'font-size:' + this.size + ';';
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
 @import url(//at.alicdn.com/t/font_783105_a9cbyqgwmc.css);

i.iconfont {
  font-size: 48px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</stylesc>
