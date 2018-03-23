<style lang="css">
	@import "../../../src/style/var.css";
	
	@component-namespace zfb {
		@component select {
			.index2 {
				text-indent: 2ch;
			}
		}
	}
</style>

<template>
	<!--<transition name="page-fade">-->
	<div class="am-list zfb-select">
		<div class="am-list-body">
			<label class="am-list-item radio" v-for="(item, index) in filterList" @click="selectItem(item, $event)" :class="{'index2': (multiLevel && !item.isRoot)}" style="padding-right: .15rem">
				<span class="am-list-thumb" v-if="hasIcon"><img :src="item.icon"></span>
				<span class="am-list-content" style="white-space: normal;">{{item.name}}</span>
				<span class="am-checkbox" v-if="selectedId === item.id && (!multiLevel || !item.isRight )">
            <input type="radio" checked="checked">
            <span class="icon-check"></span>
          </span>
				<span class="am-list-arrow" v-if="item.isRight">
              <span class="am-icon arrow horizontal"></span>
            </span>
			</label>
		</div>
	</div>
	<!--</transition>-->
</template>

<script>
/**
 * zfb-select
 * @desc 下拉选择组件
 *
 * @module components/field
 * @param {string} [selectedId] - field 类型，接受 text，number 等
 * @param {Boolean} [multiLevel] - 是否展示两级
 * @param {Boolean} [hasIcon] - 是否展图标
 * @param {Array} [selectList] - 数据列表 {id: 1, name: '张三', level: 1}
 * @param {Function} [selected] - 通信传递选中的数据
 *
 * @example
 * <zfb-select :selectList="selectList" :selectedId="selectedId" :multiLevel="multiLevel" v-on:selected="selected" v-if="showSelect"></zfb-select>
 *
	 selectList1: [{id: 1, name: '张三', level: 1}, {id: 2, name: '李四', level: 1}],
	 selectList1Index: -1,
	 
	 selectList2: [
	 {id: 1, name: '世界', hasList: true, pId: '', level: 1},
	 {id: 2, name: '中国', hasList: true, pId: 1, level: 2},
	 {id: 3, name: '浙江', hasList: true, pId: 2, level: 3},
	 {id: 4, name: '杭州', pId: 3, level: 4},
	 {id: 5, name: '宁波', pId: 3, level: 4}],
	 selectList2Index: -1,
 */

import props from './selectUtil';
export default {
  name: 'zfb-select',
  props: props,
  data () {
    return {
      selected: -1,
      level: 1,
      selectId: ''
    };
  },
  methods: {
    selectItem (item, e) {
      e.stopPropagation();
      e.preventDefault();
      if (!item.isRoot && item.hasList) {
        this.selectId = item.id;
        this.level++;
      } else {
        this.$emit('selected', this.selectList[item.index]);
      }
    }
  },
  computed: {
    filterList () {
      if (this.multiLevel) {
        return this.selectList.filter((item, index) => {
          item.index = index;
          delete item.isRoot;
          delete item.isRight;
          if (!this.selectId) { // 第一级开始
            if (item.level === 1) {
              item.isRoot = true;
              item.isRight = false;
            } else if (item.hasList) {
              item.isRight = true;
            }
            if (item.level <= 2) {
              return true;
            }
          } else if ([item.id, item.pId].indexOf(this.selectId) !== -1) {
            if (item.level === this.level) {
              item.isRoot = true;
              item.isRight = false;
            } else if (item.hasList) {
              item.isRight = true;
            }
            return true;
          }
          return false;
        });
      } else {
        return this.selectList.filter((item, index) => {
          item.index = index;
          if (item.level === this.level) {
            if (item.hasList) {
              item.isRight = true;
            };
            return true;
          }
          return false;
        });
      }
    }
  }
};
</script>
