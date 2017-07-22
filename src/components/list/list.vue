<template>
        <div class="list">
            <div class="input">
                <i class="icon-arrow_lift" @click="allComplete"></i>
                <input class="input-content" type='text' placeholder="What needs to be done?" @keypress="textInput"/>
            </div>
            <!--滚动内容的外层容器，也就是创建BS的元素高度必须大于滚动内容的高度才会滚动-->
            <div ref="list-bs" class="bs-wrapper">
                <ul class="list-item-wrapper" ref="listitemul">
                    <li v-for="(item,index) in list" class="list-item" :class="{'iscom':item.isCom}" v-show="showStatus(item)">
                        <div class="icon-wrapper-head" @click="itemToggle(index)"><i class="icon-check_circle" v-show="item.isCom"></i></div>{{item.val}}
                        <i class="icon-close" @click="itemDel(index)"></i>
                    </li>
                </ul>
            </div>
        </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    /*只需要引入mapMutations方法展开mutations数组，而并不需要引入store.js，因为已经在根组件引入*/
    import { mapMutations } from 'vuex'
    export default{
        data(){
            return {
                bs:{},
                toggle:true
            }
        },
        computed:{
            list(){
                return this.$store.state.list
            }
        },
        props:{
            allSel:{
                type:Boolean
            },
            actSel:{
                type:Boolean
            },
            comSel:{
                type:Boolean
            }
        },
        methods:{
            /*引入store.mutations的方法*/
            ...mapMutations([
                'add',
                'allComplete',
                'itemToggle',
                'itemDel',
                'clearComplete'
            ]),
            /*input监听keyperss事件，遇到换行符就输出字符串到list数组*/
            textInput(event){
                if(event.keyCode==13){
                    this.add({val:event.target.value,isCom:false})
                    event.target.value=''
                    /*list添加新元素后需要刷新bs*/
                    /*需要在下一次事件循环中执行刷新，防止DOM未加载完毕*/
                    this.$nextTick(() => {
                        this.bs.refresh()
                    })
                }
            },
            //依据父组件传递来的props状态，对当前item的v-show做计算
            //方法的执行会改变betterscroll的内容区，需要重新计算DOM高度后刷新
            showStatus(item){
                if(this.allSel){
                    this.$nextTick(() => {
                        this.bs.refresh()
                    })  
                    return true
                }
                if(this.actSel){
                    this.$nextTick(() => {
                        this.bs.refresh()
                    })  
                    return !item.isCom
                }
                if(this.comSel){
                    this.$nextTick(() => {
                        this.bs.refresh()
                    })  
                    return item.isCom
                }                       
            }
        },
        created(){
            //初始化betterscroll
            this.$nextTick(() => {
                this.bs=new BScroll(this.$refs["list-bs"],{
                    click:true
                })
            })
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/test"
    .list
        font-size 30px
        overflow hidden
        position absolute
        top 250px
        bottom 100px
        left 0
        width 100%
        overflow hidden
        .input
            width 100%
            height 70px
            position relative
            .icon-arrow_lift
                //display inline-block
                position absolute
                top 0
                left 0
                display block
                transform rotate(-90deg)
                padding 20px
                font-size 30px
                color #000
            .input-content
                box-sizing border-box
                height 70px
                line-height 70px
                width 100%
                padding-left 10%
                border 0
                border-bottom 1px solid #333
                font-size 30px
        .bs-wrapper
            //规定容器高度，小于滚动内容
            position absolute
            top 70px
            bottom 0
            left 0
            overflow hidden
            width 100%
            .list-item-wrapper
                margin 0
                padding 0
                .list-item
                    position relative
                    text-decoration none
                    list-style none
                    height 70px
                    line-height 70px
                    box-sizing border-box
                    width 100%
                    padding 0 12%
                    border-bottom 1px solid #666
                    overflow:hidden
                    /*显示省略符号来代表被修剪的文本。*/
                    text-overflow:ellipsis
                    &.iscom
                        text-decoration line-through
                        color #aaa
                    .icon-wrapper-head
                        position absolute
                        top 10px
                        left 20px
                        padding 9px
                        border 1px solid #333
                        border-radius 50%
                        width 30px
                        height 30px
                        .icon-check_circle
                            color lightgreen
                    .icon-close
                        position absolute
                        font-size 30px
                        top 20px
                        right 20px
                        color red
</style>