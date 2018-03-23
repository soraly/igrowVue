<template>
	<div class="page-select">
		<h1 class="page-title">Select</h1>
		<div class="am-list form" v-if="!showSelect">
			<div class="am-list-body">
				<div class="am-list-item" @click="toSelect('selectList0')">
					<div class="am-list-content">简单select</div>
					<div class="am-list-extra">
						{{selectList0Index === -1 ? '请选择' : selectList0[selectList0Index].name}}
					</div>
					<div class="am-list-arrow"><span class="am-icon arrow horizontal"></span></div>
				</div>
				<div class="am-list-item" @click="toSelect('selectList1')">
					<div class="am-list-content">简单select带图表</div>
					<div class="am-list-extra">
						{{selectList1Index === -1 ? '请选择' : selectList1[selectList1Index].name}}
					</div>
					<div class="am-list-arrow"><span class="am-icon arrow horizontal"></span></div>
				</div>
				
				<div class="am-list-item" @click="toSelect('selectList2')">
					<div class="am-list-content">分页select</div>
					<div class="am-list-extra">
						{{selectList2Index === -1 ? '请选择' : selectList2[selectList2Index].name}}
					</div>
					<div class="am-list-arrow"><span class="am-icon arrow horizontal"></span></div>
				</div>
				
				<div class="am-list-item" @click="toSelect('selectList3')">
					<div class="am-list-content">分页select父节点可选择</div>
					<div class="am-list-extra">
						{{selectList3Index === -1 ? '请选择' : selectList3[selectList3Index].name}}
					</div>
					<div class="am-list-arrow"><span class="am-icon arrow horizontal"></span></div>
				</div>
			</div>
		</div>
		
		<zfb-select :selectList="selectList" :selectedId="selectedId" :multiLevel="multiLevel" :hasIcon='hasIcon' @selected="selected" v-if="showSelect"></zfb-select>
	</div>
</template>

<script>
export default {
  data () {
    return {
      selectList0: [{id: 1, name: '张三', level: 1}, {id: 2, name: '李四', level: 1}],
      selectList0Index: -1,
			
      selectList1: [{id: 1, icon: 'https://os.alipayobjects.com/rmsportal/OhSzVdRBnfwiuCK.png', name: '张三', level: 1}, {id: 2, icon: 'https://os.alipayobjects.com/rmsportal/OhSzVdRBnfwiuCK.png', name: '李四', level: 1}],
      selectList1Index: -1,
      
      selectList2: [
				{id: 1, name: '世界', hasList: true, pId: '', level: 1},
				{id: 2, name: '中国', hasList: true, pId: 1, level: 2},
				{id: 3, name: '浙江', hasList: true, pId: 2, level: 3},
				{id: 4, name: '杭州', pId: 3, level: 4},
				{id: 5, name: '宁波', pId: 3, level: 4}],
      selectList2Index: -1,
			
      selectList3: [
				{id: 1, name: '世界', hasList: true, pId: '', level: 1},
				{id: 2, name: '中国', hasList: true, pId: 1, level: 2},
				{id: 3, name: '浙江', hasList: true, pId: 2, level: 3},
				{id: 4, name: '杭州', pId: 3, level: 4},
				{id: 5, name: '宁波', pId: 3, level: 4}],
      selectList3Index: -1,
			
      theType: 'selectList1',
      
      hasIcon: false,
      multiLevel: false,
      showSelect: false,
      selectList: [],
      selectedId: -1
    };
  },
	
  methods: {
    toSelect (theType) {
      this.theType = theType;
      this.selectList = this[theType];
      this.selectedId = this[theType][this[theType + 'Index']] ? this[theType][this[theType + 'Index']].id : -1;
      this.multiLevel = false;
      this.hasIcon = false;
      if (this.theType === 'selectList1') {
        this.hasIcon = true;
      }
      if (this.theType === 'selectList3') {
        this.multiLevel = true;
      }
      this.showSelect = true;
    },
    selected (data) { // selected 组件
      this[this.theType + 'Index'] = data.index;
      this.showSelect = false;
    }
  }
};
</script>
