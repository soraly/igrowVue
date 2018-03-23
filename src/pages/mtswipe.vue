<template>
  <div class="page-mtswipe">
    <h1 class="page-title">Swipe</h1>
    <p class="page-mtswipe-desc">基础用法</p>
    <zfb-mtswipe :auto="auto" :continuous="continuous" @change="handleChange">
      <zfb-mtswipe-item class="slide1">1</zfb-mtswipe-item>
      <zfb-mtswipe-item class="slide2">2</zfb-mtswipe-item>
      <zfb-mtswipe-item class="slide3">3</zfb-mtswipe-item>
    </zfb-mtswipe>

    <p class="page-mtswipe-desc">隐藏 indicators</p>
    <zfb-mtswipe :show-indicators="false">
      <zfb-mtswipe-item class="slide1">1</zfb-mtswipe-item>
      <zfb-mtswipe-item class="slide2">2</zfb-mtswipe-item>
      <zfb-mtswipe-item class="slide3">3</zfb-mtswipe-item>
    </zfb-mtswipe>

    <p class="page-mtswipe-desc">取消自动播放</p>
    <zfb-mtswipe :auto="0">
      <zfb-mtswipe-item class="slide1">1</zfb-mtswipe-item>
      <zfb-mtswipe-item class="slide2">2</zfb-mtswipe-item>
      <zfb-mtswipe-item class="slide3">3</zfb-mtswipe-item>
    </zfb-mtswipe>

    <p class="page-mtswipe-desc">设置默认显示页</p>
    <zfb-mtswipe :auto="0" :defaultIndex="1">
      <zfb-mtswipe-item class="slide1">1</zfb-mtswipe-item>
      <zfb-mtswipe-item class="slide2">2</zfb-mtswipe-item>
      <zfb-mtswipe-item class="slide3">3</zfb-mtswipe-item>
    </zfb-mtswipe>

    <p class="page-mtswipe-desc">单个幻灯片</p>
    <zfb-mtswipe :show-indicators="false">
      <zfb-mtswipe-item class="slide1">SINGLE SLIDE</zfb-mtswipe-item>
    </zfb-mtswipe>
  </div>
</template>

<style>
  @component-namespace page {
    @component mtswipe {
      @descendent desc {
        text-align: center;
        color: #666;
        margin-bottom: 5px;
      }
      .zfb-mtswipe {
        height: 200px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
      }

      .zfb-mtswipe-item {
        line-height: 200px;
      }

      .slide1 {
        background-color: #0089dc;
        color: #fff;
      }

      .slide2 {
        background-color: #ffd705;
        color: #000;
      }

      .slide3 {
        background-color: #ff2d4b;
        color: #fff;
      }
			h3 {
				height: 30px;
				font-size: 20px;
			}
    }
  }
</style>

<script>
  export default {
    name: 'mtswipe',
    data () {
      return {
        auto: 2000,
        continuous: true
      };
    },
    
    methods: {
      handleChange (index) {
        console.log(index);
        index = 0;
        return index;
      }
    }
  };
</script>
