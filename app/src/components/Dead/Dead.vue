<template>
  <div class="dead">
    <img src="@/assets/images/obsolete.png" alt="加载失败">
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
  .dead {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ccc;
    opacity: .8;
    z-index: 999;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>