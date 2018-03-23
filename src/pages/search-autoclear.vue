<template>
	<div class="page-search-autoclear">
		<h1 class="page-title">SearchAutoclear</h1>
		
		<am-search-autoclear v-model="keyword"></am-search-autoclear>
		<div class="am-list">
			<div class="am-list-item" v-for="sj in filterList">
				<div class="am-list-content" v-text="sj"></div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        keyword: '',
        list: [
          '杭州市西湖区',
          '杭州市拱墅区',
          '杭州市上城区',
          '杭州市下城区',
          '杭州市萧山区',
          '杭州市三墩镇'
        ]
      };
    },
    computed: {
      filterList () {
        return this.list.filter(item => item.includes(this.keyword));
      }
    }
  };
</script>
