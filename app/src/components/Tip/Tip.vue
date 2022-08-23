<template>
  <div class="tips">
    <transition-group
      appear
      name="animate__animated"
      enter-active-class="animate__fadeInLeft animate__animated"
      leave-active-class="animate__fadeOut animate__animated"
    >
      <van-form @submit="onSubmit" v-if="!CanJump" key="roomform">
        <van-field
          v-model="username"
          name="username"
          label="游戏内名称"
          placeholder="此处最好填入您的真实姓名或者外号"
          :rules="[{ required: true, message: '' }]"
          maxlength="8"
        />
        <van-field
          integer
          v-if="isHost"
          name="population"
          label="请选择玩家数量"
        >
          <template #input>
            <van-stepper v-model="population" min="4" max="12" />
          </template>
        </van-field>
        <van-field
          v-if="!isHost"
          v-model="roomid"
          name="roomid"
          label="房间号"
          placeholder="请输入6位房间号"
          :rules="[{ required: true, message: '' }]"
        />
        <div v-if="isHost" style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >创建房间</van-button
          >
        </div>
        <div v-else style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >加入房间</van-button
          >
        </div>
      </van-form>
      <van-loading
        v-if="CanJump"
        size="100px"
        color="#0094ff"
        vertical
        key="loading45648"
        >君莫急躁，我正在帮您创建房间</van-loading
      >
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      population: 4,
      roomid: "",
      CanJump: false,
      
    };
  },
  methods: {
    onSubmit(values) {
      
      //判断是创建房间还是加入房间
      if (values.population) {
        //产生一个房间号
        this.roomid = this.getRandomSixNum();
        //创建房间
        this.socket.emit("createRoom", {
          username: values.username,
          roomid: this.roomid,
          population: values.population,
          isHost: true,
        });
        //将数据发送到desk组件中
      }
      if (values.roomid) {
        this.socket.emit("addRoom", {
          username: values.username,
          roomid: this.roomid,
        });
       
      }
    },
    getRandomSixNum() {
      let RandomSixStr = "";
      for (let i = 0; i < 6; i++) {
        RandomSixStr += String(Math.floor(Math.random() * 10));
      }
      return RandomSixStr;
    },
  },
  props: ["isHost"],
  created() {
    //绑定成功事件
    this.$bus.$on("createRoom", () => {
      this.CanJump = true;
      if (this.CanJump) {
        // 该他妈跳转了
        //传递房间号到desk组件
        window.setTimeout(() => {
           this.$router.replace("/desk").catch(err=>console.log(err))
          window.setTimeout(() => {
            console.log("生成的房间号", this.roomid);
            this.$bus.$emit("receiveRoomDatas", {roomid:this.roomid,population:this.population,username:this.username});
            //通知这是主机
             this.$bus.$emit('HeisHost',this.isHost)
          }, 200);
        }, 2000);
      }
    });
    this.$bus.$on("playjumpRoom", () => {   
      window.setTimeout(() => {
        //因为玩家进入了，所以这里还需再次通知一下,请注意，这里和上面出发了两次
        this.$bus.$emit("receiveRoomDatas", {roomid:this.roomid,username:this.username,population:this.population});
      }, 100);
    });
  },
};
</script>

<style socped  lang='scss'>
.van-form {
  width: 100%;
  position: absolute;
  margin: 30px 0;
}
.van-field__label {
  width: 7.2em !important;

  text-align: center !important;
}
</style>