<template>
  <div>
    <van-notice-bar left-icon="volume-o" :text="text" color="#000" />
    <van-button @click="backToHome" type="primary" size="mini" around
      >回到主页</van-button
    >
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  props: {
    text: {
      default: "欢迎来到谁是卧底",
    },
  },
  methods: {
    backToHome() {
      Dialog.confirm({
        title: "温馨提示",
        message: "回到主页，将退出房间，再次进入需输入房间号，确认退出吗",
      })
        .then(() => {
          // on confirm
          this.socket.emit('leaveroom')
          this.$router.replace("/home").catch(err=>console.log(err));
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style scoped lang="scss">
.van-notice-bar {
  height: 5vh !important;
  background: inherit !important;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
div {
  position: relative;
  .van-button {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    z-index: 1000;
  }
}
</style>