<template>
  <van-popup
    class="showDetailOfVote"
    v-model="show"
    closeable
    position="bottom"
    :style="{ height: '50%' }"
    :overlay="false"
  >
    <p v-for="(item, index) in formatOfDetail" :key="index">
      <span class="eletor">{{ item.eletor }}</span
      >&lt;-:
      <span class="voter" v-for="(e, s) in item.voters" :key="s">{{ e }}、</span>
    </p>
    <h3>投票详情</h3>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      show:this.showDetailOfVote,
      detail:this.detailOfVote
    };
  },
  props: ["detailOfVote", "showDetailOfVote","sonCall"],
  watch:{
    show(){
      //通知父组件更改数据
      this.sonCall(this.show)
    },
    showDetailOfVote(){
      this.show=this.showDetailOfVote
    },
    detailOfVote(){
      this.detail=this.detailOfVote
    }
  },
  computed: {
    formatOfDetail() {
      let data = [];
      //筛选出所有被选举者
      let eletors = [];
      this.detail.forEach((item) => {
        if (eletors.indexOf(item.eletor) === -1) {
          eletors.push(item.eletor);
        }
      });
     
      //统计被选举者的投票情况
      let temp = new Array(eletors.length).fill(new Array());

      eletors.forEach((e, index) => {
        this.detail.forEach((v) => {
          if (e === v.eletor) {
          
            //这里不能用push我也是醉了
            temp[index] += `${v.voter} `;
           
          }
        });
       
      });

      temp=temp.map((item) => {
        let tool= item.split(" ")
        tool.pop()
        return tool
      });
     
      
      //将数据整合
      eletors.forEach((item, index) => {
        data.push({ eletor: item, voters: temp[index] });
      });
      return data
    },
  },
};
</script >

<style scoped>
.eletor {
  color: red;
}
.voter {
  color: rgb(167, 18, 221);
}
h3 {
  position: absolute;
  top: 3px;
  left: 50%;
  text-indent: 0;
  transform: translate(-50%);
  font-weight: 400;
  color: rgb(22, 83, 235);
}
p {
  margin: 8px 10px;
  background-color: #c8eacd;
  border-radius: 2px;
  line-height: 20px;
}
.showDetailOfVote {
  padding: 30px 0;
  text-indent: 2em;
}
</style>