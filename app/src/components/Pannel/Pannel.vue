<template>
  <div class="pannel">
   <p class="son">
    <slot></slot>
   </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.pannel {
  width: 100%;
  height: 160px;
  margin-top: 10px;
  background: url('../../assets/images/pannel.png');
  background-position: -5px -5px;
  background-size: 103% 105%;
  padding: 40px 30px;

  .son {
    color: rgb(35, 19, 210);
  }
}
</style>