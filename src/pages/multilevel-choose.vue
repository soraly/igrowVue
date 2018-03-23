<template>
	<div class="page-multilevel-choose">
		<h1 class="page-title">MultilevelChoose</h1>
		
		<div class="am-list form"	v-if="!startChoose">
			<div class="am-list-item">
				<div class="am-list-content">选择街道</div>
				<div class="am-list-extra" v-text="label" @click="startChoose=true"></div>
				<div class="am-list-arrow"><span class="am-icon arrow horizontal"></span></div>
			</div>
		</div>
		<multilevel-choose
				v-if="startChoose"
				:my-list="chooseList" :my-title="chooseTitle"
				@choose="choose" @close="closeChoose" @evaluation="evaluation">
		</multilevel-choose>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        label: '请选择',
        startChoose: false,
        chooseTitle: '选择街道',
        chooseList: []
      };
    },
    
    created () {
      this.setData();
    },
    
    methods: {
      setData () {
        this.chooseList = [{
          'label': '杭州市西湖区',
          'children': [
            {
              'children': [],
              'label': '杭州市西湖区文一路'
            },
            {
              'children': [],
              'label': '杭州市西湖区文二路'
            }]
        }];
      },
      choose (data) {
        this.startChoose = false;
        this.label = data.label;
        this.keyword = '';
        this.setData();
      },
      closeChoose () {
        this.startChoose = false;
        this.setData();
      },
      evaluation (value) {
        this.chooseList = value;
      }
    }
  };
</script>
