<template>
	<div id="temp">
	      <div id="#desc">
	      		<div class="title">
				<h4>{{photoinfo.title}}</h4>
				<p>
					{{photoinfo.add_time | dataFmt('YYYY-MM-DD HH:mm:ss')}}  {{photoinfo.click}}次浏览
				</p>
				<p class="line"></p>
			</div>
			<div class="infoBox">
				<ul class="mui-table-view mui-grid-view">
		        <li v-for="(item,index) in smallPhoto" class="mui-table-view-cell mui-media mui-col-xs-3">  
		                <img class="mui-media-object preview-img" :src="item.src"  height="100"  @click="$preview.open(index, smallPhoto)"> 
		        </li>
		       
		   	 	</ul>
		       <div class="padd" v-html="photoinfo.content"></div>  
			</div>
	      </div>
	      <comment :id="id"></comment> 
	</div>
</template>
<script type="text/javascript">
	import comment from '@/components/comment'
	import axios from 'axios'
	import '@/config/timefmt.js'
	export default {
		components: {
			comment
		},
		data() {
			return {
				photoinfo: [],
				smallPhoto: [],
				id: 0,
				api:{
					info: 'http://vue.studyit.io/api/getimageInfo/' ,
					smPic: 'http://vue.studyit.io/api/getthumimages/'
				}
			}
		},
		methods: {
			getPicInfo() {
				return axios.get( this.api.info + this.id)
			},
			getSmPhoto() {
				return axios.get( this.api.smPic  + this.id)
			},
			renderAll() {
				axios.all([ this.getPicInfo(), this.getSmPhoto() ])
				.then(axios.spread((first, second) => {
					this.photoinfo = first.data.message[0]
					second.data.message.map((item, index) => {
						const img = document.createElement('img')
						img.src = item.src
						item.w = img.width;
						item.h = img.height;
						return item;
					})
					this.smallPhoto = second.data.message
				}))
			}
		},
		created() {
			this.id = this.$route.params.id
			this.renderAll()
		}
	}
</script>
<style scoped >
.title h4{
	color: #0094ff;
}
.title p{
	color:rgba(0,0,0,0.5);
}

.title,#content{
	padding: 5px;
}
  #desc .title .line{
  width: 100%;
  height: 1px;
  border-bottom: 1px solid rgba(0,0,0,0.4);
}
* { touch-action: none; } 

</style>