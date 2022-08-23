<template>
  <div class="header" ref="head">
    <p>酒桌游-奇妙的谁是卧底</p>
    <p class="auth">作者：之冀</p>
  </div>
</template>

<script>
//引入图片地址
import ImgUrl from "@/assets/images/he_bg.gif";
export default {
  name: "Topheader",
  methods: {
    loadImage() {
      //准备拿图片
      // console.log(typeof ImgUrl); //这里是真的搞笑
      var myImage = new window.Image();
      myImage.src = ImgUrl;
      myImage.onload = () => {
        const { head } = this.$refs;
        // console.log(head.style);
        head.style.backgroundImage = `url(${ImgUrl})`;
      };
    },
  },
  mounted() {
    this.loadImage();
  },
};
</script>

<style scoped lang='scss'>
.header {
  position: relative;
  width: 100%;
  height: 10vh;
  background: url("https://img2.baidu.com/it/u=128589838,2597987891&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500");
  background-size: cover;
  text-align: center;
  line-height: 10vh;
  color: #fff;
  transition:all 1s;
  // border-radius: 0 0 20px 20px ;
  opacity: .8;
}
.auth {
  position: absolute;
  right: 20px;
  bottom: 20px;
  line-height: 0;
}
</style>