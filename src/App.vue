<template>
    <div id="app">
        <router-link to="/" v-show="visible">
            <i class="iconfont icon-arrow-left page-back"></i>
        </router-link>
        <router-view></router-view>
    </div>


</template>

<script>
    import vueRoute from 'vue-router'
    export default {
        name: 'app',
        data() {
            return {

            }
        },
        methods: {
            setRem(){
                var deviceWidth = $(window).outerWidth();
                if (deviceWidth > 640) {
                    $("html").css("font-size", "100px");
                } else {
                    $("html").css("font-size", deviceWidth / 640 * 100 + 'px');
                }
            }
        },
        created(){
            var _this = this;
            _this.setRem();
            window.onorientationchange = function () {
                _this.setRem();
            };
            window.onresize = function () {
                _this.setRem();
            };
        },
        mounted(){
          console.log(this.$route)
        },
        computed: {
            visible: function(){
                if(this.$route.fullPath != '/'){
                    return true
                }else {
                    return false
                }
            }

        }
    }
</script>

<style lang='scss'>
    .icon-xiangzuo {
        position: absolute;
        left: 15px;
        top: 20px;
        font-size: 20px;
    }

    html, body {
        background-color: #fafafa;
        -webkit-overflow-scrolling: touch;
        user-select: none;
        height: 100%;
        font-size: 14px;
    }

    #app {
        height: 100%;
    }

    a {
        color: inherit;
    }

    .page-back {
        display: inline-block;
        position: absolute;
        top: 12px;
        left: 10px;
        width: 40px;
        height: 40px;
        text-align: center;
        font-size: 30px;
        i {
            font-size: 30px;
            line-height: 40px;
        }
    }

    .page-title {
        font-size: 20px;
        margin: 0 auto;
        padding: 20px 0;
        text-align: center;
        display: block;
        line-height: 16px;
    }

    .page-demo {
        padding-bottom: 50px;
        .indexicon {
            width: 30px;
            font-size: 22px;
            color: #26a2ff;
            display: inline-block;
            vertical-align: middle;
            &.icon-swipe {
                font-size: 26px;
            }

            &.icon-checklist {
                font-size: 18px;
            }
        }
    }
</style>
