<template lang="html">
    <div id="temp">
		<div class="row" v-for="(item,index) in datalist">
			<!-- <mt-switch class="switch" v-model="value"></mt-switch> -->
			<el-switch v-model="value[index]" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
			<img class="img" :src="item.thumb_path" alt="商品图片" >
			<div class="inforight">
				<h4 v-text="item.title"></h4>
				<div class="bottom">
					<ul>
						<li>￥{{item.sell_price}}</li>
						<li><inputNumber :initCount="item.cou" :id="item.id"></inputNumber></li>
						<li><a href="javascript:void(0)" @click="delrow(item.id,index)">删除</a></li>
					</ul>
		
				</div>
			</div>
		</div>
		
		<div id="total">
			<div class="desc">
				<ul>
					<li>总计（不含运费）</li>
					<li>已勾选商品{{totalCount}}件,总价:￥{{totalAmount}}元</li>
				</ul>
			</div>
			<div id="button">
				<!-- <mt-button  type="danger" size="small">去结算</mt-button> -->
			</div>
		</div>
		{{value}}
    </div>
</template>
<script type="text/javascript">

	import {HTTP} from '@/config/server.js'
	import inputNumber from '@/components/inputNumber.vue'
	import Bus from '@/config/bus.js'
	import { getGoodsObj, updateLocal, removeItem } from '@/config/localstorage.js'

	export default {
		components: {
			inputNumber
		},
		computed: {
			totalCount() {
				//计算总件数
				//计算总价格 =  选中物件的价格总和
				//一种物件的价格 = 其件数* 单价
				
				
				//通过监听inputNumber是否改变来决定是否获取最新的localstorage中的值
				Bus.$on('goodsChange', () => {
					let obj = getGoodsObj();
					this.datalist.forEach((item, index) => {
							item.cou = obj[item.id]
					})
				})

				//选中的物件
				let trueArr = this.value.filter((item) => {return item})
				let amount = 0;
				this.value.forEach((item, index) => {
					//对值为true的物件进行计算
					if(item) {
						let count = this.datalist[index].cou
						let price = this.datalist[index].sell_price;
						let itemAmount = count * price
						amount += itemAmount;
					}
				})
				this.totalAmount = amount;
				return trueArr.length;
			}
		},
		data () {
			return {
				datalist: [],
				value: [],
				// totalCount: 0,
				totalAmount: 0,
				api: {
					allGoods: 'api/goods/getshopcarlist/'
				}
			}
		},
		created() {
			this.$loading({
				text: '正在加载',
				fullscreen: true
			});
			this.getDataList();
			this.getChangeRes();
		},
		methods: {
			getDataList() {
				let goodsString = ''
				let obj = getGoodsObj();
				
				for( let key in obj) {
					goodsString += key + ','
				}

				//如果obj为空 那么goodsString 为空,那么不用去请求接口了
				if(goodsString.length == 0) {
					return false;
				}

				goodsString = goodsString.substr(0,goodsString.length-1) 
				HTTP.get(this.api.allGoods + goodsString)
				.then((res) => {
					res.data.message.forEach((item, index) => {
						item.cou = obj[item.id]
					})
					this.datalist = res.data.message
					//关闭loading
					
						this.$loading().close();
					
				})
			},
			getChangeRes() {
				//订阅inputNumber改变的值的对象
				Bus.$on('goodsChange', (res) => {
					updateLocal(res)
				})
			},
			delrow(goodsid, index) {
				this.value.splice(index, 1);
				this.datalist.splice(index, 1);
				removeItem(goodsid)
			}
		}
	}
</script>
<style lang="css" scoped>
	.row{
		border-bottom: 1px solid rgba(0,0,0,0.3);
		height: 102px;
		display: flex;
		padding: 5px;
	}

	.switch{
		flex:0 0 52px;
	}

	.img{
		margin-left: 5px;
		height: 75px;
		width: 75px;
		flex: 0 0 85px;
	}

	.inforight{
		margin-left: 5px;
		flex:1;
	}
	.inforight ul{
		padding-left: 0px;
	}
	.inforight li{
		list-style: none;
		display: inline-block;
	}

	.inforight h4{
		color: #0094ff;
		font-size: 14px;
	}

	.bottom li:first-child{
		color:red;
		margin-right: 5px;
	}

	.bottom li:last-child{
		margin-left: 5px;
	}
	#total{
		height: 100px;
		background-color: rgba(0,0,0,0.1);
		display: flex;
		padding: 5px;;
	}

	#total ul {
	 padding-left: 0px;
	}
	#total li{
		list-style: none;
		font-size: 14px;
	}

	#button{
		flex:0 0 60px;
		margin: 30px 0 0 0 ;
	}

	.desc{

		flex:1;
	}
</style>