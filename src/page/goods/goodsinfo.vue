<template>
	<div id="temp">
	<!-- 轮播图区域 -->
  	  <el-carousel :interval="4000" type="card" height="300px">
	    <el-carousel-item v-for="item in imgs" :key="item.id">
	      <img :src="item.src">
	    </el-carousel-item>
	  </el-carousel>
	<!-- 商品购买区 -->
     <div id="purchase">
     	  <h4 v-text="goodsInfo.title"></h4>
     	  <div class="mainArea"> 
	     	  <span>市场价:</span><s>￥{{goodsInfo.market_price}}</s>
	     	  <span v-text="'销售价:'+goodsInfo.sell_price"></span>
	     	  <div class="center count">
	     	  		<span  class="purchase_count">购买数量：</span>
					
	     	  		 <inputNumber :id="id" @send="getData"></inputNumber> 
	     	  		<!-- <transition name="show"
					  @enter="enter" @after-enter="afterEnter"
					>
						<div v-if="isshow" class="ball"></div>
					</transition> -->
	     	  </div>
				<el-button  size="small" type="primary" @click="toCart">立即购买</el-button>
<el-button @click="addTocart" size="small" type="success">加入购物车</el-button>

     	  </div>

     </div>

	<div id="params">
			<h6>商品参数</h6>
			<p class="line"></p>
		<ul>
			<li v-text="'商品货号:'+goodsInfo.goods_no">商品货号:</li>
			<li v-text="'库存情况:'+goodsInfo.stock_quantity">库存情况：</li>
			<li v-text="'上架时间：'+goodsInfo.add_time"></li>
		</ul>
	</div>
	<!-- 图文详情区域 -->

	<!-- 商品评论区域 -->
	<div id="other">
	    <!-- 进入图文详情页面 -->
	      <router-link v-bind="{to:'/goods/goodsdesc/'+this.id}">
<!-- 	      	<mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button> -->
	      </router-link>
		<!-- 进入商品评论页面 -->	
		    <router-link v-bind="{to:'/goods/goodscomment/'+this.id}">
	      		<!-- <mt-button type="danger" size="large">商品评论</mt-button> -->
	      	</router-link>
			
		</div>
	</div>
</template>
<script type="text/javascript">
	import {HTTP} from '@/config/server.js'
	import inputNumber from '@/components/inputNumber.vue'
	import { Loading } from 'element-ui';

	import Bus from '@/config/bus.js'
	import {setItem, valueObj,getItem} from '@/config/localstorage.js'

	export default {
		components: {
			inputNumber
		},
		data () {
			return {
				id: 1,
				goodsInfo: [],
				imgs: [],
				goodsData: [],
				total_count: null,
				api: {
					goodsinfo: 'api/goods/getinfo/',
					imgs: 'api/getthumimages/'
				}
			}
		},
		beforeCreate(){
			this.$loading({
				fullscreen: true,
				text: '正在拼命加载中'
			})
		},
		created() {
			this.id = this.$route.params.id
			this.getGoodsInfo()
			this.getImgs()
			
		},
		methods: {
			getGoodsInfo() {
				HTTP.get(this.api.goodsinfo + this.id)
				.then((res) => {
					this.goodsInfo = res.data.message[0]
					setTimeout(() => {
						this.$loading().close()
					},0)
				})
			},
			getImgs() {
				HTTP.get(this.api.imgs + this.id)
				.then((res) => {
					this.imgs = res.data.message
				})
			},
			addTocart() {
				if(!this.total_count) {
					return false;	
				}
				//像localstrorage中存储值
				valueObj.goodsid = this.id;
				valueObj.count = this.total_count
				setItem(valueObj)
				//通过Event bus 通知订阅者 事件已经发生
				Bus.$emit('refresh', 1)
			},
			getData(data) {
				this.total_count = data
			},
			toCart() {
				this.$router.push('/cart/shoppingcart')
			}
		}
	}
</script>
<style scoped>
#temp{
	padding:5px;
}
#purchase{
	margin-top:5px;
	border:1px solid #ccc;
	border-radius: 4px;
	padding:3px;
}
#purchase h4{
	color:skyblue;
	text-align: center;
    padding:12px 0;
	border-bottom:1px solid #ccc;
}
.mainArea{
	padding: 15px;
	
}
.mainArea  span{
	font-size: 13px;
}
.mainArea span:nth-of-type(2){
	margin-left:40px;
}
.mainArea .count{
	  margin: 18px 0 ;
}

#params{
	padding:12px;
	border:1px solid #ccc;
	margin-top:5px;
	margin-bottom:5px;
}


#purchase li,#params li{
	 list-style: none;
	 padding-top:8px;
	 padding-bottom:8px;
	 font-size: 14px;
}

#purchase .price span{
	color:red;
}
.purchase_count {
	line-height: 32px;
}
#other .imgdesc{
	margin-bottom: 20px;
}
.count{
	display: flex;
	position:relative;
	justify-content: center;
}
.ball{
	 background-color: #ef4f4f;
	height: 20px;
	width: 20px;
	border-radius: 50%;
	position: absolute;
	left:120px;
	top:50px;
	transition: all 1s ease;
	z-index: 100;
	opacity: 1;
}

</style>