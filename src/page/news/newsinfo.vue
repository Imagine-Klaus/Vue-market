<template>
	<div>
		 <div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{info.add_time | dataFmt}} {{info.click}}次浏览</p>
        </div>
        <div id="content" v-html="info.content">
        
        </div>
        <comment :id="id"></comment>	
        <!-- <comment :id="id"></comment> -->
	</div>
</template>
<script type="text/javascript">
	import {HTTP} from '@/config/server.js'
	import timefmt from '@/config/timefmt.js'
	import comment from '@/components/comment'
	export default {
		components: {
			comment
		},
		data() {
			return {
				id: 0,
				info: []
			}
		},
		created(){
			this.id = this.$route.params.id;
			this.$nextTick(() => {
				this.getInfo()
			})
		},
		methods: {
			getInfo() {
				HTTP.get('/api/getnew/'+this.id).then((res) => {
					this.info = res.data.message[0];
				})
			}
		}
	}
</script>
<style scoped>

</style>