<!--<style lang="scss">-->
    <!--/*@import "../../../src/style/var.css";*/-->
    <!--.page-demo {-->
        <!--.zfb-swipe {-->
            <!--box-sizing: border-box;-->
            <!--color: inherit;-->
            <!--min-height: 48px;-->
            <!--display: block;-->
            <!--overflow: hidden;-->
            <!--position: relative;-->
            <!--text-decoration: none;-->
            <!--.zfb-swipe-wrapper {-->
                <!--align-items: center;-->
                <!--box-sizing: border-box;-->
                <!--display: flex;-->
                <!--min-height: inherit;-->
                <!--overflow: hidden;-->
                <!--width: 100%;-->
            <!--}-->
            <!--.zfb-swipe-left {-->
                <!--position: absolute;-->
                <!--height: 100%;-->
                <!--left: 0;-->
                <!--transform: translate3d(-100%, 0, 0);-->
            <!--}-->
            <!--.zfb-swipe-right {-->
                <!--position: absolute;-->
                <!--height: 100%;-->
                <!--right: 0;-->
                <!--top: 0;-->
                <!--transform: translate3d(100%, 0, 0);-->
            <!--}-->
        <!--}-->
    <!--}-->
    <!---->
    <!--.zfb-swipe-wrapper,-->
    <!--.zfb-swipe-left,-->
    <!--.zfb-swipe-right {-->
        <!--transition: transform 150ms ease-in-out;-->
    <!--}-->
    <!--.pp {-->
        <!--color: red;-->
    <!--}-->
<!--</style>-->

<template>
    <div
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="endDrag"
        class="zfb-swipe"> <!--:opened="opened" :dragging="dragging"-->

        <div class="zfb-swipe-left" ref="left"  @click.stop="swipeMove()">
            <slot name="left">
                <div></div>
            </slot>
        </div>
        <div class="zfb-swipe-wrapper" ref="content" @click.capture="swipeMoveAndStop($event)">
            <slot></slot>
        </div>
        <div class="zfb-swipe-right" ref="right"  @click.stop="swipeMove()">
            <slot name="right">
                <div></div>
            </slot>
        </div>
        <p class="pp">this is swiper...</p>
    </div>
</template>

<script>
/**
 * zfb-swipe
 * @desc 左右滑动
 *
 * @module components/field
 * @param {Number} [swipeOpenIndex]
 * @param {Number} [index]
 * @param {html} [slot] - 中间区域的内容 必填
 * @param {html} [slot="right"] - 右边的内容
 * @param {html} [slot="left"] - 左边的内容
 * @param {Function} [switchSwipe] - 事件告知父组件自己的状态
 *
 * @example
 * <zfb-swipe class="swipe-box" v-for="(item, index) in list" :key="index" :swipeOpenIndex="swipeOpenIndex" :index="index" @switchSwipe="switchSwipe">
 *  <div class="center">center区域，右边有内容可以划出</div>
 *  <div slot="right" class="swipe-box-right">right</div>
 * </zfb-swipe>
 *
 * 思路
 * 1、触摸滑开左边或右边内容
 * 2、再次点击恢复到未滑开的状态
 * 3、点击左边或右边内容恢复到未滑开的状态
 * 4、告之父组件自己的状态
 * 5、接受父组件消息更新自己状态
 */
import { once } from './swipeUtil';
export default {
  name: 'zfb-swipe',
  props: {
    index: Number,
    swipeOpenIndex: Number,
    slide: Boolean,
    direction: String
  },
  data () {
    return {
      bakIndex: -1,
      dragging: false, // 是否是拖拽状态 （重要标志)
      opened: false,   // 是否是展开状态 （重要标志)
      start: { x: 0, y: 0 }
    };
  },
  created () {
    // 修复 android 支付宝  滑动问题
    setTimeout(() => {
      this.swipeMove();
    }, 500);
  },

  mounted () {
    this.wrap = this.$refs.content;
    this.leftElm = this.$refs.left.children[0];
    this.rightElm = this.$refs.right.children[0];
    this.leftWrapElm = this.leftElm.parentNode;
    this.rightWrapElm = this.rightElm.parentNode;
    this.leftWidth = this.leftElm.getBoundingClientRect().width;
    this.rightWidth = this.rightElm.getBoundingClientRect().width;

    this.leftDefaultTransform = this.translate3d(-this.leftWidth - 1);
    this.rightDefaultTransform = this.translate3d(this.rightWidth);

    this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
    this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
  },

  methods: {
    resetSwipeStatus () {
      this.dragging = false;
      this.swiping = false;
      this.offsetLeft = 0;
    },

    translate3d (offset) {
      return `translate3d(${offset}px, 0, 0)`;
    },

    swipeMoveAndStop (e) {
      if (this.opened) { // 如果自己是滑开的 恢复到未滑开状态
        this.opened = false;
        e.stopPropagation();
      } else {
        if (this.bakIndex !== -1) { // 兄弟swipe 有滑开的 ， 兄弟swipe恢复到未滑开状态， 把自己滑开
          this.$emit('switchSwipe', {index: this.swipeOpenIndex, status: false});
          e.stopPropagation();
        }
      }
      this.swipeMove();
    },

    swipeMove (offset = 0) {
      this.wrap.style.webkitTransform = this.translate3d(offset);
      this.rightWrapElm.style.webkitTransform = this.translate3d(this.rightWidth + offset);
      this.leftWrapElm.style.webkitTransform = this.translate3d(-this.leftWidth + offset);
      if (offset) {
        this.swiping = true;
      } else {
        this.opened = false;
      }
    },

    swipeLeaveTransition (direction) { // 手势滑动结束，状态更新
      setTimeout(() => {
        this.swipeLeave = true;

        if (direction > 0 && (-this.offsetLeft > this.rightWidth * 0.4 || this.slide)) { // 滑开左边
          this.swipeMove(-this.rightWidth);
          this.resetSwipeStatus();
          this.opened = true;
          return;
        } else if (direction < 0 && (this.offsetLeft > this.leftWidth * 0.4 || this.slide)) { // 滑开右边
          this.swipeMove(this.leftWidth);
          this.resetSwipeStatus();
          this.opened = true;
          return;
        }
        this.opened = false;
        this.swipeMove(0);

        // 体验优化，防止抖动
        once(this.wrap, 'webkitTransitionEnd', _ => {
          this.wrap.style.webkitTransform = '';
          this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
          this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
          this.swipeLeave = false;
          this.swiping = false;
        });
      }, 0);
    },

    startDrag (evt) { /* 开始拖拽 兄弟swipe恢复到未滑开状态 */
      // 根据左测右侧是否有内容来决定是否可以滑动
      if (!this.$refs.right.children[0].innerHTML) {
        this.rightWidth = 0;
      } else {
        this.rightWidth = this.$refs.right.children[0].getBoundingClientRect().width;
      }
      if (!this.$refs.left.children[0].innerHTML) {
        this.leftWidth = 0;
      } else {
        this.leftWidth = this.$refs.left.children[0].getBoundingClientRect().width;
      }
      
      this.dragging = true;
      this.bakIndex = this.swipeOpenIndex;
      this.$emit('switchSwipe', {index: -1, status: false});
      evt = evt.changedTouches ? evt.changedTouches[0] : evt;
      this.start.x = evt.pageX;
      this.start.y = evt.pageY;
    },

    onDrag (evt) { // 拖拽效果
      if (this.opened) { // 如果是滑开状态，直接恢复到未滑开状态
        !this.swiping && this.swipeMove(0);
        this.opened = false;
        return;
      }
      if (!this.dragging) return;
      let swiping;
      const e = evt.changedTouches ? evt.changedTouches[0] : evt;
      const offsetTop = e.pageY - this.start.y;
      const offsetLeft = this.offsetLeft = e.pageX - this.start.x;

      if ((offsetLeft < 0 && -offsetLeft > this.rightWidth) ||
          (offsetLeft > 0 && offsetLeft > this.leftWidth) ||
          (offsetLeft > 0 && !this.leftWidth) ||
          (offsetLeft < 0 && !this.rightWidth)) {
        return;
      }

      const y = Math.abs(offsetTop);
      const x = Math.abs(offsetLeft);

      swiping = !(x < 5 || (x >= 5 && y >= x * 1.73));
      if (!swiping) return;
      evt.preventDefault();

      this.swipeMove(offsetLeft);
    },

    endDrag () {
      if (!this.swiping) return;
      this.swipeLeaveTransition(this.offsetLeft > 0 ? -1 : 1);
    }
  },

  watch: {
    'opened': function (n, o) { // 4、告之父组件自己的状态
      this.$emit('switchSwipe', {index: this.index, status: n});
    },
    'swipeOpenIndex': function (n, o) { // 5、接受父组件消息更新自己状态
      if (!this.dragging && n != this.index) {
        this.swipeMove();
        this.opened = false;
      }
    },
    'slide': function (n, o) {
      if (n) {
        if (this.direction === 'left') {
          this.swipeLeaveTransition(-1);
        } else if (this.direction === 'right') {
          this.swipeLeaveTransition(1);
        }
      }
    }
  }
};
</script>
