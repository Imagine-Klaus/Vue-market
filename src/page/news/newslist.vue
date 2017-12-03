<template>
	<div>
	<ul class="mui-table-view">
		<li v-for="item in newslist" :key="item.id" class="mui-table-view-cell mui-media">
			<router-link :to="{name:'newsinfo', params:{ id: item.id} }" class="changeColor">
				<img :src="item.img_url" class="mui-media-object mui-pull-left leftImg" >
				<div class="mui-media-body right-area">
					<h4 v-text="item.title"></h4>
					<div id="btm-msg">
						<span class="addtime">{{item.add_time | dataFmt}}</span>
						<span class="click">点击:{{item.click}}</span>
					</div>
				</div>
			</router-link>
		</li>
	</ul>
	</div>
</template>
<script type="text/javascript">
	import { HTTP } from '@/config/server.js'
	import dataFmt from '@/config/timefmt.js'
	export default {
		data(){
			return {
				newslist: []
			}
		},
		created(){
			this.$nextTick(() => {
				HTTP.get('api/getnewslist').then((res)=> {
					this.newslist = res.data.message
				})
			})
		}
	}
</script>
<style scoped>
	.mui-table-view-cell > .changeColor {
		background-color: #fff!important;
	}
	.mui-table-view .mui-media-object{
           max-width: 75px;
           line-height:75px;
           height:75px;
     }
    .newsBox .leftImg{
           width: 100px;
    }
    .ft{
        margin-top: 1.5em;
        font-size: 12px;
        color:#0094ff;
    }
    .ft .time{
            vertical-align: middle;
    }
    .ft .click{
        margin-left: 20px;
        font-size: inherit;
    }
    .right-area {
    	display: flex;
    	height: 75px;
    	flex-direction: column;
    	justify-content: space-between;
    	text-align: left;
    }
    .right-area #btm-msg {
		display: flex;
    }
    .right-area #btm-msg .addtime {
    	margin-right: 20px;
    }
</style>