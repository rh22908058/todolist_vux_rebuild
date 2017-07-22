import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    /*定义了2个全局state，内容列表和切换全部完成/未完成的状态toggle，并初始化*/
    state: {
        list: [{ val: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', isCom: true }, {
            val: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            isCom: false
        }, {
            val: 'ccccccccccccccccccccccccccccccccccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            isCom: true
        }, { val: 31, isCom: true }],
        toggle: false
    },
    /*定义对于state也就是列表的操作,后续引入到组件的methods中*/
    mutations: {
        /*添加item*/
        add(state, item) {
            state.list.push(item)
        },
        /*切换全部完成/未完成*/
        allComplete(state) {
            state.toggle = !state.toggle
            state.list.forEach((item) => {
                item.isCom = state.toggle
            })
        },
        /*单个切换完成/未完成*/
        itemToggle(state, index) {
            state.list[index].isCom = !state.list[index].isCom
        },
        /*删除单个item*/
        itemDel(state, index) {
            state.list.splice(index, 1)
        },
        /*全部删除已完成*/
        clearComplete(state) {
            for (let i = state.list.length - 1; i >= 0; i--) {
                if (state.list[i].isCom) {
                    state.list.splice(i, 1)
                }
            }
        }
    }
})