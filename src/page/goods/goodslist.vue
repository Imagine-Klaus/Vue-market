<template>
	<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="500">
		<el-row>
		  <el-col :span="12" v-for="(item, index) in list" :key="item.id" >
		    <el-card :body-style="{ padding: '0px' }">
				<router-link v-bind="{to:'/goods/goodsinfo/'+item.id}" class="setBlock">
			      <img :src="item.img_url" class="image">
			      <div style="padding: 14px;">
			        <div class="desc">
						<p>
							<span v-text="'￥'+item.sell_price">+</span>
							<s v-text="item.market_price">￥</s>
						</p>
						<p>
							<h6 class="left">热卖中</h6>
							<h6 class="right" v-text="item.stock_quantity"></h6>
						</p>
			        </div>
			      </div>
				</router-link>
		    </el-card>
		  </el-col>
		</el-row>
	</div>
</template>
<script type="text/javascript">
	import {HTTP} from '@/config/server.js';
	import { Loading } from 'element-ui';
	import infiniteScroll from 'vue-infinite-scroll'
	export default {
		directives: {infiniteScroll},
		data() {
			return {
				list:[],
				pageIndex: 1,
				api: {
					goods: 'api/getgoods?pageindex='
				},
				busy: true
			}
		},
		beforeCreate(){
			this.$loading({
					fullscreen: true,
					text: '正在拼命加载中'
			})
		},
		created() {
			this.getGoods();
		},
		methods: {
			getGoods() {
				HTTP.get(this.api.goods + this.pageIndex)
				.then((res)=>{
				    // this.busy = false;
					this.list = this.list.concat(res.data.message)
					if( this.pageIndex == 1 ) {
						//获取过第一页数据后打开无限加载
						this.busy = false;
						setTimeout(() => {
						 	this.$loading().close();
						},0)
					}
				})
			},
			loadMore: function() {
				if(this.pageIndex == 2) {
					return false;
				}
			  	this.busy = true;
			  	this.pageIndex++;
			  	setTimeout(() => {
				    this.getGoods()
				}, 1000);
			}
		}
	}
</script>
<style  scoped>
li{
	border: 1px solid rgba(0,0,0,0.4);
	-webkit-box-shadow: 0 0 4px #000;
	-moz-box-shadow: 0 0 4px #000 ;
	box-shadow: 0 0 4px #000 ;
	margin-left: 4px;
	padding-left: 0px;
}

.desc{
	height: 60px;
	background-color: rgba(0,0,0,0.1);
	margin-top: 10px;
	padding: 5px;
	text-align: left;
	position: relative;
}
.desc span{
	color: red;
	margin-right: 15px;
}
.desc .right{
		position: absolute;
		right: 10px;
		bottom: 0px;
	}

.desc .left{
	position: absolute;
	left: 10px;
	bottom: 0px;
}

a{
	padding-left: 0px;
	margin-left: 0px;
}
img {
	height: 300px;
	width: 300px;
}
.setBlock {
	display: block;
}

</style>