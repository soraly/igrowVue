<style lang="css">
	@import "../../../src/style/var.css";
	
	@component-namespace zfb {
		@component multilevel-choose {
			position: fixed;
			top: 0;
			width: 100%;
			background-color: #fff;
			.am-search:not([am-version]) {
				/*padding-top: 52px;*/
				margin-top: .44rem;
			}
			.am-list:not([am-version]) {
				padding: 0;
			}
			
			@descendent header {
				position: fixed;
				width: 100%;
				height: .44rem;
				line-height: .44rem;
				text-align: center;
				color: #fff;
				background-color: #343B43;
				font-size: $font-size-littlebig;
				z-index: 1000;
				
				.back {
					position: absolute;
					left: 0;
					i {
						float: left;
						width: .1rem;
						height: .17rem;
						margin: .13rem .08rem;
						background: url(https://dsb-cdn.oss-cn-hangzhou.aliyuncs.com/alipay/assets/images/back%402x.png) no-repeat;
						background-size: contain;
					}
				}
				.close {
					position: absolute;
					left: .64rem;
				}
			}
		}
	}
</style>

<template>
	<div class="zfb-multilevel-choose">
		<div class="zfb-multilevel-choose-header">
			<span class="back" @click="back()"><i></i>返回</span>
			<span class="close" @click="close()" v-if="isShowClose">关闭</span>
			<span class="title" v-text="myTitle"></span>
		</div>
		<am-search-autoclear v-model="keyword"></am-search-autoclear>
		<div class="am-list">
			<div class="am-list-item" v-for="(sj,index) in filterList" @click="choose(sj)">
				<div class="am-list-content" v-text="sj.label"></div>
				<div class="am-list-arrow" aria-hidden="true" v-if="!sj.arrowShow">
					<span class="am-icon arrow horizontal"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  /**
   * 多级选择
   * <multilevel-choose
   * :my-list="chooseList" :my-title="chooseTitle"
   * @choose="choose" @close="close" @evaluation="evaluation"
   * ></multilevel-choose>
   * chooseList: 当前选择页面列表
   * close: 关闭多级选择
   * choose: 最终选中的数据
   * evaluation: 获取下一级的数据
   */
  import AmSearchAutoclear from '../../search-autoclear/index.js';

  export default {
    name: 'multilevel-choose',
  
    props: ['myList', 'myTitle'],
  
    components: { AmSearchAutoclear },
  
    data () {
      return {
        keyword: '',
        isShowClose: false, // 是否显示关闭按钮
        floor: 1,
        chosenData: [], // 曾经被选择的数据组成的数组
        isBack: false // 是否点击返回按钮
      };
    },
    
    methods: {
      choose (data) {
        this.isBack = false;
        for (let i in this.myList) {
          if (this.myList[i] === data) {
            this.isLast(i);
          }
        }
      },
      blankObj (data) { // 是否空对象
        for (let i in data) {
          return false;
        }
        return true;
      },
      isLast (index) {
        if (this.myList[index].children.length === 0 || this.blankObj(this.myList[index].children)) {
					/* 是最后一层 */
          this.isShowClose = false;
          this.$emit('choose', this.myList[index]);
        } else {
					/* 有子元素 */
          this.isShowClose = true;
          this.floor++;
          this.$emit('evaluation', this.myList[index].children);
        }
      },
      addArrow (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].children.length === 0 || this.blankObj(data[i].children)) {
            data[i].arrowShow = true;
          } else {
            data[i].arrowShow = false;
          }
        }
        return data;
      },
      back () { // 选择列表中返回按钮
        this.isBack = true;
        if (this.floor === 1) {
          this.isShowClose = false;
          this.$emit('close');
        } else {
          if (this.floor === 2) {
            this.isShowClose = false;
          }
          this.floor--;
          let data = this.chosenData[this.floor - 1];
          this.chosenData.pop();
          this.$emit('evaluation', data);
        }
      },
      close () {
        this.$emit('close');
      }
    },
    
    computed: {
      filterList () {
        return this.myList.filter(item => item.label.includes(this.keyword));
      }
    },
    
    watch: {
      'myList' (n, o) {
        if (!this.isBack) {
          this.addArrow(n);
          this.chosenData.push(n);
        }
      }
    }
  };
</script>
