<template>
  <div class="desk">
    <!-- 上面区域 -->
    <Boadcast :text="toptext" />
    <div class="content">
      <!-- 左边区域 -->
      <div class="left">
        <player
          v-for="item in leftPlayerData"
          :key="item.id"
          :src="item.imgSrc"
          :username="item.username"
          :id="item.id"
          :isDead="item.isDead"
          :isFirst="isFirst"
        />
      </div>
      <!-- 中间区域 -->
      <div class="mid">
        <advertising-board v-if="!reconnection"
          >房间号:{{ roomid }}</advertising-board
        >
        <p v-if="!reconnection">我的词语:{{ showThisWordDetail }}</p>
        <van-button
          size="large"
          v-if="isHost"
          round
          hairline
          icon="guide-o"
          type="primary"
          @click="GameStart"
          >开始游戏</van-button
        >
        <van-button
          size="large"
          round
          type="primary"
          hairline
          v-if="voting"
          color="#7232dd"
          icon="browsing-history"
          @click="vote"
          >发起投票</van-button
        >
        <pannel v-if="isFirst" v-html="toall"></pannel>
        <van-loading type="spinner" v-if="reconnection" color="#ff0000"
          >断线重连中，请稍后，火急火燎的为您加载中</van-loading
        >
      </div>
      <!-- 右边区域 -->
      <div class="right">
        <player
          v-for="item in rightPlayerData"
          :key="item.id"
          :src="item.imgSrc"
          :username="item.username"
          :id="item.id"
          :isDead="item.isDead"
          :isFirst="isFirst"
        />
      </div>
    </div>

    <!-- 下边区域 -->
    <van-button
      class="replay"
      size="large"
      type="danger"
      round
      block
      v-if="replayPrivilege"
      @click="replay"
      >replay</van-button
    >

    <!-- 通知模态框 -->
    <ResultOfVote
      :detailOfVote="detailOfVote"
      :showDetailOfVote="showDetailOfVote"
      :sonCall="fatherChange"
    ></ResultOfVote>

    <!-- 卡牌区域 -->

    <transition
      appear
      name="animate__animated"
      enter-active-class="animate__animated animate__zoomInLeft"
      leave-active-class="animate__animated animate__rotateOut"
    >
      <div class="card_box" v-if="gaming" :class="turnover">
        <card
          @click.native="showsecret"
          :class="showing"
          :yourword="yourWord"
          :arise="arise"
        ></card>
      </div>
    </transition>
    <div class="mask" v-if="isDead"></div>
  </div>
</template>

<script>
import Boadcast from "@/components/Boadcast/Boadcast.vue";
import Player from "@/components/Player/Player.vue";
import AdvertisingBoard from "@/components/AdvertisingBoard/AdvertisingBoard.vue";
import Card from "@/components/Card/Card.vue";
import Pannel from "@/components/Pannel/Pannel.vue";
import ResultOfVote from "@/components/ResultOfVote/ResultOfVote.vue";
import { Dialog } from "vant";
export default {
  data() {
    return {
      population: 0,
      username: "",
      roomid: "",
      yourWord: "",
      //准备数据，渲染桌面
      playerData: [],
      isHost: false,
      toptext: "欢迎来到谁是卧底，等待房主开始游戏",
      reconnection: false,
      gaming: false,
      turnover: "",
      showing: "",
      arise: false,
      showThisWordDetail: "",
      isFirst: false,
      toall: "<span>nihao<span/>",
      voting: false,
      isDead: false,
      replayPrivilege: false,
      showDetailOfVote: false,
      detailOfVote: [ ],
    };
  },
  methods: {
    GameStart() {
        if (this.playerData.length < 4) {
        this.$notify({ type: "warning", message: "人数不足4人，无法开启游戏" });
        return;
      } 
      this.isHost = false;
      //之后会将这里设置为30s
      window.setTimeout(() => {
        this.voting = true;
      }, 10000)
      this.socket.emit("gameBegin");
    },
    showsecret() {
      this.turnover = "animate__flip animate__animated";
      window.setTimeout(() => {
        this.showing = "showsecret"; //更换类名
        this.arise = true;
        this.turnover = "";
        window.setTimeout(() => {
          this.showThisWordDetail = this.yourWord;
          this.gaming = false;
          this.showing = "";
          this.arise = false;
        }, 2000);
      }, 1000);
    },
    replay() {
      Dialog.confirm({
        title: "弱弱的插一句嘴",
        message: "点击这个按钮将会重新开始游戏，确定要重开吗",
      })
        .then(() => {
          // on confirm
          this.socket.emit("replay");
        })
        .catch(() => {
          // on cancel
        });
    },
    vote(e) {
      //30s后才能发起投票
      this.socket.emit("vote");

      //让按钮隐藏起来
    },
    //子组件通过父亲的做法
    fatherChange(value) {
      this.showDetailOfVote = value;
    },
  },
  computed: {
    leftPlayerData() {
      let length = this.playerData.length;
      if (length > 12)
        return [
          {
            username: "erro",
            imgSrc:
              "https://img1.baidu.com/it/u=592570905,1313515675&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            id: "erro",
          },
        ];
      let realCount = 0;
      if (length % 2 === 0) realCount = length / 2;
      else realCount = Math.floor(length / 2);
      return this.playerData.slice(0, realCount);
    },
    rightPlayerData() {
      let length = this.playerData.length;
      if (length > 12)
        return [
          {
            username: "erro",
            imgSrc:
              "https://img1.baidu.com/it/u=592570905,1313515675&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            id: "erro",
          },
        ];
      let realCount = 0;
      if (length % 2 === 0) realCount = length / 2;
      else realCount = Math.floor(length / 2);
      return this.playerData.slice(realCount);
    },
  },
  components: {
    Boadcast,
    Player,
    AdvertisingBoard,
    Player,
    AdvertisingBoard,
    Card,
    Pannel,
    Card,
    ResultOfVote,
  },
  beforeCreate() {
    this.$bus.$on("receiveRoomDatas", (object) => {
      this.roomid = object.roomid;
      this.username = object.username;
      this.population = object.population;
    });
    this.$bus.$on("HeisHost", (isHost) => {
      this.isHost = isHost;
      this.replayPrivilege = true;
    });
    this.$bus.$on("addRoom", (playerData) => {
      this.playerData = playerData;
    });
    this.socket.on("whoVote", (option) => {
      this.$notify({
        type: "warning",
        message: `${option.one}投给了${option.to}`,
      });
    });
  },
  mounted() {
    this.socket.on("receive_word", (word) => {
      this.isFirst = false;
      this.gaming = true;
      this.toptext = "游戏已经开始";
      this.yourWord = word;
    });

    this.socket.on("firstsay", (option) => {
      //轮询，真的，这种代码太捞了
      let canIdo = window.setInterval(() => {
        if (this.gaming === false && this.arise === false) {
          this.toall = option.message;
          this.isFirst = true;
          clearInterval(canIdo);
        }
      }, 1000);
    });

    // 插槽改变,改变toall中的值
    this.socket.on("voteBegin", (option) => {
      if (this.isDead) {
        this.toall = "您已被淘汰，无法投票，其他玩家正在进行投票";
        return;
      }
      if (!this.isFirst) {
        return;
      }
      this.toall = option.toall;
      if (option.message) {
        this.showDetailOfVote = true;
        this.detailOfVote = option.message;
      }
    });

    this.socket.on("replayed", () => {
      //房主逻辑
      if (this.replayPrivilege) {
        this.voting = false;
        this.isHost = true;
        this.isFirst = false;
        this.toptext = "请主持开始游戏";
        this.yourWord = "";
        this.isDead = false;
        this.showThisWordDetail = "";
      } else {
        //平民逻辑
        this.isFirst = false;
        this.toptext = "等待房主开始游戏";
        this.yourWord = "";
        this.isDead = false;
        this.showThisWordDetail = "";
      }
    });

    //投票结果接收
    this.socket.on("playerDead", (option) => {
      this.toall = `<p>${option.name}被投票出局</p>
      <p>他的身份是：<span style="color:red">${option.identity}</span></P>
      `;
      this.showDetailOfVote = true;
      this.detailOfVote = option.message;
      if (this.username === option.name) {
        //此玩家死亡
        this.isDead = true;
        this.toptext = "您已经被淘汰，请耐心等待游戏结束";
      }
    });

    this.socket.on("forbiddenVote", () => {
      this.voting = false;
    });

    this.socket.on("activeVote", () => {
      this.voting = true;
    });

    this.socket.io.on("reconnect", () => {
      // 重连事件
      this.$notify({ type: "warning", message: "啊哦，断线了哦，尝试重连中" });
      this.reconnection = true;
      if (this.isHost) {
        this.socket.emit("addRoom", {
          username: this.username,
          roomid: this.roomid,
          population: this.population,
          isHost: true,
        });
      } else {
        this.socket.emit("addRoom", {
          username: this.username,
          roomid: this.roomid,
        });
      }
      this.socket.on("connect", () => {
        this.reconnection = false;
      });
    });
  },
};
</script>

<style scoped lang='scss'>
.desk {
  position: relative;
  height: 100vh;
  background: url("@/assets/images/desk.jpg");
  background-size: 100%;

  .card_box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}
.content {
  display: flex;
  width: 100%;
  height: 80vh;

  .left {
    flex: 1;
  }
  .mid {
    position: relative;
    flex: 2;
    text-align: center;
    .van-button {
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-50%) translateY(-50%);
      z-index: 1000;
    }
  }
  .right {
    flex: 1;
  }
  .left,
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
.showsecret {
  background-color: #fff !important;
  background-image: none;
}
.bottom {
  position: relative;
  width: 100%;
  height: 20vh;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.replay {
  margin: 0 auto;
  width: 60%;
  z-index: 999;
}

</style>