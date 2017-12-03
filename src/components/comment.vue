<template>
	 <div id="temp">
        <!-- 1.0 实现提交评论的静态结构 -->    
        <div class="postComment">
        	<h3 class="title">提交评论</h3>
        	<p class="line"></p>
        	 <textarea placeholder="请输入评论内容" class="inputBox" v-model="comment" @keydown.enter="postComment"></textarea>
   	<el-alert
	    title="您没有输入内容"
	    type="error"
	    center
	    show-icon
		v-show = "promptShow"
	    >
  	</el-alert>
        	<el-button type="primary"  @click="postComment">提交</el-button>
        	<p class="line"></p>
        	
        </div>
        <!-- 获取评论区域 -->

        <div  class="commentList">
        		<h3 id="title">评论列表</h3>
        		<p class="line"></p>
        		<div class="sigleComment" v-for="(item,index) in  list">
		        		<div class="comTitle">
			                  <span>第{{index+1}}楼</span>        		
			                  <span>用户:{{item.user_name}}</span>
			                  <span>发表时间:{{item.add_time | dataFmt( 'YYYY-MM-DD HH:MM:ss' )}}</span>
		        		</div>
		        		<ul class="mui-table-view commentContent">
							<li class="mui-table-view-cell" v-text="item.content">
								
							</li>
						</ul>
        		</div>
        </div>
         <!-- 实现点击加载更多按钮 -->
         <!-- <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button> -->
         <el-button type="primary" @click="getMore" :loading="loading.flag == 1?false:true">{{ loading.text = loading.flag == 1 ? '点击加载更多': '加载中'}}</el-button>
		<p class="line"></p>
	</div>
</template>
<script type="text/javascript">
	import {HTTP} from '../config/server.js'
	import '../config/timefmt.js'
	import { Message } from 'element-ui';
	export default {
		data() {
			return {
				comment: '',
				list: [],
				pageIndex: 1,

				//控制视图显示
				loading:{
					text: '',
					flag: 1  //控制是loading否显示
				},
				promptShow: false
			}
		},
		props: ['id'],
		mounted(){
			this.$nextTick(() => {
				this.getComment( this.pageIndex );
			})
		},
		methods: {
			postComment(){
				if( this.comment.trim().length <= 0 ) {
					this.promptShow = true;
					setTimeout(()=>{
						this.promptShow = false;
					},1000)
					return false;
				}
				HTTP.post('api/postcomment/'+this.id, {content: this.comment}, {
                      headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }
                })
                .then((res) => {
                		if( res.data.status != 0 ) {
                			Message.warning({ message: '获取不到数据', dduration: 1000 })
                			return false;
                		}
                		Message.success(
                			{message: '提交评论成功', duration: 1000})
						this.list = [{
								user_name: 'LLL',
								add_time: new Date(),
								content: this.comment
						}].concat(this.list)
						this.comment = '';
						this.getComment( this.pageIndex )
				})
			},
			getComment( pageIndex ){
				HTTP.get('/api/getcomments/'+ this.id +'?pageindex='+ pageIndex )
				.then( (res) =>{
					this.loading.flag = 1;
					this.list = this.list.concat(res.data.message)
				} )
			},
			getMore() {
					this.loading.flag = 2;
					this.pageIndex++;
					this.getComment( this.pageIndex )
			}
		}
	}
</script>
<style scoped>
.postcomment{
	padding: 5px;
}
.line{
	height: 1px;
	width: 100%;
	border-bottom: 1px solid rgba(0,0,0,0.3);
}

	/*2.0 评论列表的样式*/
#list{
	padding: 5px;
}
.comTitle{
	padding: 5px;
	color: #6d6d72;
	font-size: 15px;
	background-color: rgba(0,0,0,0.1);
}
.inputBox{
	font-size: 16px;
	/*height: 120px;*/
	overflow: hidden;
}
.commentContent{
    height: 100px;
    border:1px solid #ccc;
    border-radius: 5px;
    margin:5px 0;
    overflow: auto;
}
</style>