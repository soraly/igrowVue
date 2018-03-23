<template>
    <section class="page-demo">
    <div key="index" v-for="(group, index) in navs">
        <div class="page-title" v-text="group.title"></div>
        <div class="am-list">
            <router-link class="am-list-item" key="index" v-for="(item, index) in group.list" :to="item.path">
                <div class="am-list-content">
                    <i class="iconfont icon-hua" ></i>
                    <span>{{ item.name }}</span>
                </div>
                <div class="am-list-arrow" aria-hidden="true">
                    <span class="icon-arrow-right iconfont horizontal"></span>
                </div>
            </router-link>
        </div>
    </div>
</section>
</template>
<script>
    import config_json from '../config.js'
    export default {
        data() {
            return {
                navs: config_json
            }
        },
        methods: {},
        computed: {}
    }
</script>
<style>

</style>