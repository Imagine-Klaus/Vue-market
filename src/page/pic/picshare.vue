<template>
	<div id="temp">
	  <!-- 图片分类 -->
		<div id="cate">
	<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
    	<div class="mui-scroll">
		    	<a class="mui-control-item mui-active">
		            全部
		        </a>
		        <a class="mui-control-item mui-active" v-for="cate in catelist"  v-text="cate.title">
		            {{cate.title}}
		        </a>
    	</div>
	</div>
</div>
图片列表
<div id="imgList">
<ul>
			<li v-for="item in list" :key="item.id">  <!-- 为什么这里绑定KEY就不行 --> 
		  		 <router-link v-bind="{to:'/picinfo/'+item.id}"> <!-- 动态绑定数据 必须用单引号 -->
		  		
			    		<img v-lazy="item.img_url">
					    <div id="desc">
						    <h5 v-text="item.title"></h5>
						    <p v-text="item.zhaiyao"></p>
					  	</div>
				</router-link>
		 	 </li>
	 	</ul>
</div>
  
	</div>
</template>
<script type="text/javascript">	
    // import '@/assets/js/mui.js'
    // import HTTP from '@/config/server.js'
    	import axios from 'axios'		
	export default{
		data() {
			return {
					list: [],
				catelist: [],
				url: {
					cate: 'http://vue.studyit.io/api/getimgcategory/',
					picInfo: 'http://vue.studyit.io/api/getimages/'
				},
				cateIndex: 0
			}
		},
		methods: {
			getCate() {
				return axios.get(this.url.cate)
			},
			getPic(cateIndex) {
				return axios.get(this.url.picInfo + cateIndex )
			}
		},
		created() {
			axios.all([ this.getCate(), this.getPic(this.cateIndex) ])
			.then( axios.spread((acc, pers) => {
				// console.log(acc.data.message)
				this.catelist = acc.data.message
				this.list = pers.data.message
			}) )
		}		              
 	}
</script>
<style type="text/css" scoped>
#cate .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active{
	    color:black;
	    border:none;
    	background: none;
}
/** { touch-action: none; } */
.mui-scroll a{ 
   border-left: 1px solid #ccc!important;
   border-bottom: 1px solid #ccc!important;
   color:skyblue;
}

image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
li{
	list-style: none;
}
	#imgList{

	}
	#imgList ul {
		padding-left: 0px;
	}
	#imgList li{
		list-style:none;
		position: relative ;
	}
	#imgList img{
		width:100%;
		height: 300px;
	}

	#desc{
		width: 100%;
		background-color: rgba(0,0,0,0.2);
		position: absolute;
		bottom: 2px;
		left: 0px;
	}

#desc h5{
	color: #ffffff;
	font-weight: bold;
}
#desc p{
	color:#fff;
}

image[lazy=loading] {
	width: 40px;
	height: 300px;
	margin: auto;
}

</style>