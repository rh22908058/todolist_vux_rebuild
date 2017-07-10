<template>
  <div id="app">
    <h1 class="header">todos</h1>
    <list @listChange="computeList" :allSel="allSel" :actSel="actSel" :comSel="comSel" ref="list"></list>
    <footer class="footer">
      <div class="item-left">{{length}}items left</div>
      <div class="item-status">
        <span class="item-all" :class="{'select':allSel}" @click="selectStatus">All</span>
        <span class="item-active" :class="{'select':actSel}" @click="selectStatus">Active</span>
        <span class="item-completed" :class="{'select':comSel}" @click="selectStatus">Completed</span>
      </div>
      <div class="clear" @click="clearCompleted" v-show="hasCompleted">Clear completed</div>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
import list from './components/list/list.vue'
export default {
  data(){
    return {
      length:0,
      allSel:true,
      actSel:false,
      comSel:false,
      hasCompleted:true
    }
  },
  components:{
    list
  },
  methods:{
    //接收子组件list传来的list数组
    computeList(list){
      this.length=list.length
      for(let i=0;i<list.length;i++){
        if(list[i].isCom){
          this.hasCompleted=true
          return
        }
        this.hasCompleted=false
      }
    },
    selectStatus(event){
      if(event.target.className.indexOf('item-all')>=0){
        this.allSel=true
        this.actSel=false
        this.comSel=false
      }
      if(event.target.className.indexOf('item-active')>=0){
        this.allSel=false
        this.actSel=true
        this.comSel=false
      }
      if(event.target.className.indexOf('item-completed')>=0){
        this.allSel=false
        this.actSel=false
        this.comSel=true
      }
    },
    //点击删除，调用子组件的clearComplete方法
    clearCompleted(){
      this.$refs.list.clearComplete()
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body
    margin 0
    padding 0
  .header
    box-sizing border-box
    border-bottom 1px solid #444
    height 250px
    line-height 250px
    text-align center
    font-size 100px
    color:red
    margin 0
    padding 0
    background rgba(7,17,27,0.8)
  .footer
    width 100%
    height 100px
    box-sizing border-box
    border-top 1px solid #333
    position fixed
    bottom 0px
    left 0px
    background #eee
    color #666
    display flex
    font-size 30px
    .item-left,.clear
      flex 0 0 200px
      padding-left 30px 
      line-height 100px
    .clear
      flex 0 0 300px
    .item-status
      flex 1
      height 100px
      padding-left 20px
      .item-all,.item-active,.item-completed
        display inline-block
        vertical-align top
        line-height 60px
        margin 20px 10px 20px 0
        padding 0 10px
        text-align center
        &.select
          border 1px solid red
          border-radius 5px
      .item-completed
        margin 20px 0 20px 0
</style>
