<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},

  created() {
    this.socket.on("tips", (msg) => {
      this.$notify(msg);
      if (msg.detail === "createRoom") {
        //通知tips组件,可以跳转了
        this.$bus.$emit("createRoom", msg.detail);
      }
      if (msg.detail === "addRoom") {
        //通知tips组件,可以跳转了
        this.$bus.$emit("playjumpRoom", msg.playerData);

        window.setTimeout(() => {
          //通知Desk组件，将玩家信息广播过去
          this.$bus.$emit("addRoom", msg.playerData);
        }, 20);
      }
      //处理投票情况的点击事件
      if (msg.detail === "vote") {
        //这部分代码是投票阶段的代码
        //给子组件绑定点击事件,确切的说，此处用事件总线通知了player组件自己绑定事件
        this.$bus.$emit("bindingClickForPlayer");
      }

      //处理房间不存在的逻辑
      if (msg.detail === "noRoom") {
        console.log(this.$router);
        if (this.$router.history.current.path === "/desk") {
          this.$router.replace("/home").catch(() => {
            console.log("欢迎来到谁是卧底的世界");
          });
          this.$notify({
            message: "您创建的房间之前已经被解散",
            type: "danger",
          });
        }
      }
    });
    this.socket.on("clientjump", () => {
      this.$router.replace("/desk").catch(() => {
        console.log("欢迎来到谁是卧底的世界");
      });
    });

    this.socket.on("disconnect", () => {
      this.$notify({
        type: "danger",
        message: "您的状态异常，请稍作等待，正在为您处理",
      });
    });
  },
};
</script>


</style>
