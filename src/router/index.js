import Vue from 'vue'
import vueRouter from 'vue-router'
import configs from '../config'

import swipe from '../pages/swipe.vue'
import alert from '../pages/alert.vue'
import Upload from '../pages/upload.vue'
import select from '../pages/select.vue'
import catalog from '../pages/catalog.vue'
import common_input from '../pages/common_input.vue'
var arr = [
    swipe, alert, select, common_input, Upload
]
Vue.use(vueRouter)

//获取arr中具体component的_file路径，与config里的path匹配，匹配成功则推入routes
var routes = [];
configs.forEach((config)=>{
    if(config.list && config.list.length){
        config.list.forEach((nav)=>{
            var temp={}
            arr.forEach((component)=>{
                if(!!~component.__file.indexOf(nav.path.slice(1))) {
                    temp = component;
                }
            })
            routes.push({
                path: nav.path,
                name: nav.name,
                component: temp
            })
        })
    }
})
routes.push({
    path: '/',
    name: 'catalog',
    component: catalog
})
var obj = new vueRouter({
    routes
})
export default obj

