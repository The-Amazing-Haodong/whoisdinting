<template>
  <div class="box" :class="change">
    <div @click="votestate">
      <img :src="src" :alt="username" />
      <p>{{ username }}</p>
    </div>
    <Dead v-if="isDead"></Dead>
  </div>
</template>

<script>
import Dead from "../Dead/Dead.vue";
export default {
  components: { Dead },
  data() {
    return {
      change: "",
      votestate: this.vote,
    };
  },
  props: {
    src: {
      default:
        "https://img1.baidu.com/it/u=3863525742,1260260654&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501",
    },
    username: {
      default: "none",
    },
    id: {},
    isDead: {
      default: false,
    },
    isFirst: {},
  },
  methods: {
    vote() {
      if (!this.isFirst) return;
    },
    voting() {
      if (!this.isFirst) return;
      this.change = "change";
      this.socket.emit("voteForSb", {
        votedId: this.id,
        name: this.username,
      });
    },
  },
  beforeCreate() {
    this.socket.on("WeConfirm", () => {
      this.votestate = this.vote;
    });

    this.$bus.$on("bindingClickForPlayer", () => {
      this.votestate = this.voting;
    });
    this.socket.on("recoveryImg", () => {
      this.change = "";
    });
   
  },
  mounted() {},
};
</script>

<style scoped lang='scss' >
.box {
  position: relative;
  width: 80%;

  background-color: rgb(227, 249, 248);
  border: 3px solid #fff;
  border-radius: 10px;
  overflow: hidden;
  img {
    display: block;
    width: 80%;
    height: 80%;
    object-fit: cover;
    border-radius: 50%;
    margin: 0 auto;
    border: 3px solid #fff;
  }
  p {
    line-height: 15px;
    text-align: center;
    font-size: 12px;
    height: 20%;
    padding-top: 5%;
  }
}
.change {
  background-color: rgb(39, 243, 181);
}
</style>