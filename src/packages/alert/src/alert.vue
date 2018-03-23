<style lang="css">
    @import "../../../src/style/var.css";

    @component-namespace zfb {
        @component alert {
            .mask {
                position: fixed 0 0 0 0;
                z-index: 100;
                background: #000;
                opacity: 0.7;
            }

            .del-confirm {
                position: fixed;
                top: 30%;
                left: 20px;
                z-index: 9999;
                border-radius: 4px;
                width: 90%;
                color: #333;
                background: #fff;

            .del-text, .textarea-modal {
                border-radius: 5px 5px 0 0;
                border-bottom: 1px solid #aaa;
            }

            .del-text, .del-choice {
                height: 50px;
                background: #fff;
                text-align: center;
                font-size: 16px;
                line-height: 50px;
            }
            
            .textarea-modal {
                padding: 15px;
                textarea {
                    width: 100%;
                    height: 100px;
                }
            }
            
            .del-choice {
                height: 40px;
                line-height: 40px;
                border-radius: 0 0 5px 5px;

            .del-yes {
                border-right: 1px solid #aaa;
            }
            
            .del-yes, .del-no {
                box-sizing: border-box;
                height: 100%;
                display: block;
                width: 50%;
                float: left;
                cursor: pointer;
                color: #ce0000;

        &:hover {
             text-decoration: none;
         }
        }
        .del-no {
            color: #9a9a9a;
        }
        .del-yes:hover, .del-no:hover {
            text-decoration: none;
        }
    }
    }
    }
    }
</style>
<!--<style lang="scss">-->
<!--@import "../../../src/style/var.scss";-->

<!--</style>-->
<template>
    <div class="zfb-alert" @touchmove="$event.preventDefault();">
        <div class="mask"></div>
        <div class="del-confirm">
            <div v-if="myList.type===1" class="del-text">{{myList.content || '确认删除？'}}</div>
            <div v-if="myList.type===2" class="textarea-modal">
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div class="del-choice">
                <a class="del-yes" @click="test()">{{myList.sureWord || '确认'}}</a>
                <a class="del-no" @click="close()">{{myList.cancelWord || '取消'}}</a>
            </div>
        </div>
        <div class="alert">

            <!--<div class="alert-content" :class="{'alert-content-img':myList.type===1||myList.type===2}">-->
            <!--<div class="alert-img" v-if="myList.type===1">-->
            <!--<img :src="myList.img.url" :style="{width: myList.img.width, height: myList.img.height}"/>-->
            <!--</div>-->
            <!--<h4 v-text="myList.title"></h4>-->
            <!--<p v-for="item in myList.content" v-html="item" :style="myList.contentStyle"></p>-->
            <!--</div>-->
            <!--<div class="alert-button" :class="[myList.btnColor]">-->
            <!--<button class="button am-button" :class="[myList.btnColor]" @click="close()">{{myList.btn || '我知道了'}}</button>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    /**
     * 自定义alert:
     * myList里的字段:
     * type: 默认为0，纯文字居左; 1为有图片且文字居中; 2为无图片文字居中。
     * titel: 标题
     * content: 内容
     * img: 图片
     * btn: 按钮文字，默认为我知道了
     */
    export default {
        name: 'zfb-alert',

        props: ['myList'],

        methods: {
            close() {
                this.$emit('close');
            },
            test() {
                this.$emit('lzx')
            }
        }
    };
</script>
