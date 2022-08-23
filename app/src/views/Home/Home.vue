<template>
  <div>
    <Topheader></Topheader>
    <div class="bottom">
      <ul>
        <li><span ref="createRoom" @click="createroom">创建房间</span></li>

        <li><span @click="addroom">加入房间</span></li>
      </ul>
    </div>
    <van-popup v-model="show" position="bottom" closeable>
      <!-- 这里是个插槽 -->
      <Tip :isHost="isHost"></Tip>
    </van-popup>
  </div>
</template>

<script>
import Topheader from "@/components/Topheader/Topheader.vue";
import Tip from "@/components/Tip/Tip.vue";
export default {
  data() {
    return {
      show: false,
      isHost: true,
    };
  },

  methods: {
    createroom() {
      this.isHost = true;
      this.show = true;
    },
    addroom() {
      this.isHost = false;
      this.show = true;
    },
  },
  watch: {
    show() {
      if (this.show) {
        this.$refs.createRoom.style.animation = "none";
        return;
      }
      this.$refs.createRoom.style.animation = "swing 1s infinite";
    },
  },
  components: {
    Topheader,
    Tip,
  },
  
};
</script>

<style scoped lang='scss'>
.bottom {
  position: relative;
  width: 100%;
  height: 90vh;
  background: url("@/assets/images/whoisdinting.png");
  background-size: 100%;
}
ul {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%) translateY(-50%);
  list-style: none;
  width: 60%;
  text-align: center;
  background: rgba(197, 226, 234, 0.6);
  border-radius: 10px;
  border: 3px solid #fff;
}
ul li {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 60px 0;
  border: 3px solid rgb(108, 110, 110);
  border-radius: 10px;
}
ul li:first-child span {
  display: block;
  animation: swing 1s infinite;
}
.van-popup {
  height: 50%;
}
</style>