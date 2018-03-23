<style lang="css">
    @import "../../../src/style/var.css";

    .form-photo-list .form-webuploader {
        line-height: 1.55rem;
        padding: 0;
        text-align: center;
        font-weight: 100;
        position: relative;
        border: 1px solid #bebebe;
        background-color: #fff;
        color: #bebebe;
        cursor: pointer;
        margin: 0 8px 5px 0;
        overflow: hidden;
        font-size: 50px;
    }

    .form-photo-list .form-photo-item, .form-photo-list .form-photo-item img, .form-photo-list .form-webuploader {
        float: left;
        width: 1.8rem;
        height: 1.55rem;
    }

    .form-photo-list input {
        opacity: 0;
        position: absolute;
        width: 1.8rem;
        height: 1.5rem;
        left: 0;
        top: 0;
        border: 0;
        font-size: 50px;
        background: none;
        /*text-indent: -9999px;*/
    }

    #imgUpload {
        display: none;

    .weui_mask {
        background: rgba(0, 0, 0, 0.2);
    }

    .imgUpload {
        left: 50%;
        top: 200px;
        color: #fff;
        height: 50px;
        width: 200px;
        padding: 15px;
        font-size: 16px;
        margin-left: -100px;
        text-align: center;
        background: #4ac8d7;
        overflow: hidden;
        position: fixed;
        z-index: 9999;
    }
    }

    #previewPictureModal {
        display: none;
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9999;

    .mask {
        width: 100%;
        height: 100%;
        background: #333;
        opacity: 0.4;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1;
    }

    .modal-dialog {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2;

    .modal-content {
        width: 100%;
        position: absolute;
        top: 10%;
    }

    }
    .modal-footer {
        width: 100%;
        height: 42px;
        line-height: 42px;
        text-align: center;
        position: fixed;
        left: 0;
        bottom: 0;
        background: #394345;
        z-index: 3;

    a {
        display: block;
        width: 100%;
        height: 42px;
        line-height: 42px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9999;
    }

    }
    }
</style>
<!--<style lang="scss">-->
<!--@import "../../../src/style/var.scss";-->

<!--</style>-->
<template>
    <div class="zfb-alert" @touchmove="$event.preventDefault();">
        <div class=" form-group form-photo-list clearfix photo-block">
            <div class="form-photo-item" v-for="pid in photo.list" :key="pid"
                 @click="previewPicture(photo.queued[pid])">
                <!--<img v-if="WXJSSDKAuth" v-show="photo.queued[pid].localId" :src="photo.queued[pid].localId "/>-->
                <img v-show="photo.queued[pid].src" :src="photo.queued[pid].src+'!square.150'"/>
            </div>
            <div v-show="photo.list.length<9 && WXJSSDKAuth" class="form-webuploader iconfont icon-camera"
                 @click="imgChoose()"></div>
            <div v-show="photo.list.length<9 && !WXJSSDKAuth" class="form-webuploader  iconfont icon-camera"
                 id="webupload"></div>
        </div>

        <!-- 图片上传中提示 -->
        <div id="imgUpload">
            <div class="imgUpload">{{photo.loadTip}}</div>
            <div class="weui_mask"></div>
        </div>

        <!-- 附件上传图片点击放大 -->
        <div id="previewPictureModal" @click="previewPicture(null, true)">
            <div class="mask"></div>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <img src="/src/src/assets/loader.gif"/>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="javascript:;" class="iconfont icon-delete" @click="removePicture(previewData)"></a>
            </div>
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
//    import vueWebuploader from 'vueWebuploader'

    export default {
        name: 'zfb-upload',
        data() {
            return {
                WXJSSDKAuth: false,
                photo: {
                    queued: {},
                    list: [],
                    loadTip: '开始上传照片',
                },
                previewData: {},
                chooseImg: 0,
                imgIndex: 0,
                uploadNum: 0,
                imgList: [],
                hashlist: [],
                saveQueued: [],
            }
        },
        props: ['myList'],
        created(){
            window.$vue = this;
        },
        mounted() {
//            this.webUpload('#webupload');
        },
        methods: {
            webUpload(element) {
                var config = {
                    pick: {
                        id: element,
                        multiple: true,
                        configkey: 'default_img'
                    },
                    auto: true,
                }
                //调整file控件位置
                var resetInput = function () {
                    setTimeout(function () {
                        var input = $(element).find('input[type=file]').first(),
                            keepclick = false;
                        //把input移动到外面，防止点击不到
                        $(element).append(input);

                        //避免频繁点击操作
                        input.click(function (e) {
                            if (keepclick) {
                                e.stopPropagation();
                                return false;
                            }
                            keepclick = true;
                            setTimeout(function () {
                                keepclick = false
                            }, 1000);
                        });
                    });
                };
                var uploader  = WebUploader.create(config);
                var events = {
                    fileQueued: function () {
                        var $this = window.$vue;
                        $this.chooseImg++;
                    },
                    startUpload: function () {
                        var $this = window.$vue;
                        $this.imgIndex = 0;
                        $this.uploadNum = $this.imgList.length;
                        $this.photo.loadTip = '开始上传照片';
                        $this.needReset = false;
                        $('#imgUpload').show();
                    },
                    uploadSuccess: function (file, result) {
                        var $this = window.$vue;
                        var file = {
                            id: file.id,
                            url: file.url,
                            urlhash: file.urlhash
                        };
                        $this.imgIndex++;
                        file.src = file.url;
                        $this.imgList.push(file);
                        $this.hashlist.push(file.urlhash);
                        $this.photo.list.push(file.id);
                        $this.photo.queued[file.id] = file;
                        $this.photo.loadTip = '已完成上传 ' + ($this.imgIndex + $this.uploadNum) + ' / ' + ($this.chooseImg + $this.uploadNum > 9 ? 9 : ($this.chooseImg + $this.uploadNum));
                        file.urlhash && $this.saveQueued.push(file.urlhash);
                    },
                    uploadFinished: function (file) {
                        var $this = window.$vue;
                        setTimeout(function () {
                            $this.photo.loadTip = '已完成上传';
                        }, 300);
                        setTimeout(function () {
                            $('#imgUpload').hide();
                        }, 1000);
                        $this.chooseImg = 0;
                    },
                    uploadError: function (file) {
                        file.status = 'error';
                        file.statusText = '失败';
                    },
                    error: function (type, file, result) {
                        var $this = window.$vue;
                        $('#imgUpload').hide();
                        //utilities.tips('上传失败：' + (!!result && result.message ? result.message : ''));
                        //this.reset()
                        type != 'Q_EXCEED_NUM_LIMIT' && utilities.tip(result);
                        if ('ERROR_TOKEN_GET' === type || type == 'ERROR_RESUMESTATUS_GET') {
                            $this.needReset = true;
                        }
                    }
                }
                //遍历并绑定上传事件
                $.each(events, function (key, value) {
                    uploader.on(key, function () {
                        var _this = this, _arguments = arguments;
                        setTimeout(function () {
                            value.apply(_this, _arguments);
                        });
                    })
                });
                resetInput()
            },
            previewPicture (imgData, isClose) {
                var $this = this;
                if (isClose) {
                    $('#previewPictureModal').fadeOut();
                    return;
                }
                var clientHeight = $(window).height() - 103,
                    clientWidth = $(window).width() - 50,
                    cssObj = {
                        'max-width': clientWidth,
                        'max-height': clientHeight,
                        'margin': '0 auto'
                    };
                $('#previewPictureModal').fadeIn();
                var img = document.createElement('img'),
                    wrap = $('#previewPictureModal').find('.modal-body')[0];
                $('#previewPictureModal').find('.modal-body').children(0).css('display', 'block');
                img.addEventListener('load', function () {
                    wrap.children[0].style.cssText = 'display:none;';
                    wrap.children[1].style.cssText = 'display:block;';
                    $('#previewPictureModal').find('.modal-body').children(1).css(cssObj);
                });
                img.style.display = 'none';
                if (wrap.children[1]) {
                    wrap.replaceChild(img, wrap.children[1]);
                } else {
                    wrap.appendChild(img);
                }
                img.src = imgData.url;
                $('#previewPictureModal').find('.modal-body').children(1).css(cssObj);
                $this.previewData = imgData;
            },
            close() {
                this.$emit('close');
            },
            test() {
                this.$emit('lzx')
            }
        }
    };
</script>
