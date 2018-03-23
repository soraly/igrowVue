<style lang="scss">
	@import "../src/style/var.css";
	
	.page-swipe {
		height: 100%;
	}
	.batch-operation-edit {
		position: absolute;
		right: .15rem;
		top: .18rem;
	}
	.page-swipe-list {
		font-size: 16px;
		.center {
			display: flex;
			flex: 1;
			align-items: center;
			min-height: .4rem;
			padding-left: .15rem;
			background-color: #fff;
			i{
				display: inline-block;
				height: .2rem;
				width: .2rem;
				margin-right:.1rem;
				background-color: red;
			}
		}
		.swipe-box-right, .swipe-box-left {
			color: red;
			display: flex;
			flex-direction: row;
			height: 100%;
			width: 1rem;
			align-items: center;
			justify-content: space-around;
		}
	}
</style>
<template>
	<div class="page-swipe"  @click.capture="closeSwipe($event)">
		<h1 class="page-title">Swipe</h1>
		<span class="batch-operation-edit" @click="edit">{{editDelete?'取消':'编辑'}}</span>
		
		<div class="page-swipe-list">
			<zfb-swipe class="swipe-box" v-for="(item, index) in list" :key="index" :swipeOpenIndex="swipeOpenIndex"
										:index="index" :slide="list[index].slide" :direction="list[index].direction" @switchSwipe="switchSwipe">
				<div class="center">
					<i v-if="editDelete" @click="slideMove(index)"></i>
					{{item.content}}
				</div>
				
				<div slot="left" class="swipe-box-left" v-if="item.direction === 'left' || item.direction === 'all'">
					<div class="delete" @click="clearLeft(index)">清空左侧</div>
				</div>
				<div slot="right" class="swipe-box-right" v-if="item.direction === 'right' || item.direction === 'all'">
					<div class="delete" @click="del(index)">删除</div>
				</div>
			</zfb-swipe>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {content: '左侧内容可以划出', direction: 'left', slide: false},
        {content: '右侧侧内容可以划出', direction: 'right', slide: false},
        {content: '右侧侧内容可以划出', direction: 'right', slide: false},
        {content: '右侧侧内容可以划出', direction: 'right', slide: false},
        {content: '右侧侧内容可以划出', direction: 'right', slide: false},
        {content: '右侧侧内容可以划出', direction: 'right', slide: false},
        {content: '左右两侧内容都可以划出', direction: 'all'}
      ],
      swipeOpenIndex: -1,
      editDelete: false
    };
  },
  
  methods: {
    clearLeft (index) {
      if (this.list[index].direction === 'all') {
        this.list[index].direction = 'right';
      } else {
        this.list[index].direction = 'none';
      }
      this.$set(this.list, index, this.list[index]);

      MyAlipayJSBridge('toast', {
        content: '清空left成功',
        type: 'success',
        duration: 2000
      });
    },
    del (index) {
      this.list.splice(index, 1);
      MyAlipayJSBridge('toast', {
        content: '删除成功',
        type: 'success',
        duration: 2000
      });
    },
    closeSwipe (e) {
      if (this.swipeOpenIndex !== -1) {
        this.swipeOpenIndex = -1;
        e.stopPropagation();
      }
    },
    switchSwipe (val) {
      setTimeout(() => {
        if (val.status) {
          this.swipeOpenIndex = val.index;
        } else {
          this.swipeOpenIndex = -1;
          if (val.index > -1) {
            this.list[val.index].slide = false;
          }
        }
      }, 10);
    },
    stopMove (e) {
      e = e || window.event;
      e.preventDefault();
      this.swipeOpenIndex = -1;
      this.$el.removeEventListener('touchmove', this.stopMove, false);
    },
    edit () {
      this.editDelete = !this.editDelete;
      if (!this.editDelete) {
        this.list.map((item, index) => {
          item.slide = false;
        });
      }
    },
    slideMove (index) {
      this.list[index].slide = true;
    }
  },
  
  watch: {
    'swipeOpenIndex': function (n, o) {
      if (n !== -1) {
        this.$el.addEventListener('touchmove', this.stopMove, false);
      }
    }
  }
};
</script>
