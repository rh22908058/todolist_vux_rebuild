<template>
  <div id="app">
    <h1 class="header">todos</h1>
    <list :allSel="allSel" :actSel="actSel" :comSel="comSel" ref="list"></list>
    <footer class="footer">
      <div class="item-left">{{length}}items left</div>
      <div class="item-status">
        <span class="item-all" :class="{'select':allSel}" @click="selectStatus">All</span>
        <span class="item-active" :class="{'select':actSel}" @click="selectStatus">Active</span>
        <span class="item-completed" :class="{'select':comSel}" @click="selectStatus">Completed</span>
      </div>
      <div class="clear" @click="clearComplete" v-show="hasCompleted">Clear completed</div>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
import list from './components/list/list.vue'
/*只需要引入mapMutations方法展开mutations数组，而并不需要引入store.js，因为已经在根组件引入*/
import { mapMutations } from 'vuex'

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
    /*引入store.mutations的方法*/
    ...mapMutations([
        'clearComplete'
    ]),
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
    }
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
