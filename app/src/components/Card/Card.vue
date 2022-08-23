<template>
  <div class="card">
    <template v-if="arise">
      <p>
        您的词语是：<span>{{ yourword }}</span>
      </p>
      <p>切记，不要告诉任何人</p>
    </template>
  </div>
</template>

<script>
export default {
  props:{
    arise:{
      default:false
    },
    yourword:{
      default:''
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%) translateY(-50%);
  width: 50%;
  height: 50%;
  background: url(https://img1.baidu.com/it/u=2170307302,1249745019&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500);
  background-size: contain;
  border: 3px solid #ccc;
  border-radius: 10px;
  text-align: center;
  p {
    margin: 60px 0;

    span {
      color: rgb(213, 47, 47);
    }
  }
}
</style>