<template>
  <div class="hello">
    <!-- 轮播图 -->
    <div class="block">
          <el-carousel height="450px">
              <el-carousel-item v-for="item in imglist" :key="item.id">
              <img :src="item.img">
          </el-carousel-item>
        </el-carousel>
    </div>

    <!-- 底下九宫格区域 -->
    <ul  id="nine-grid" class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 ">
            <router-link to="/newslist" >
                    <span class="mui-icon mui-icon-home img1"></span>
                    <div class="mui-media-body">新闻资讯</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 ">
            <router-link to="/picshare" >
                    <span class="mui-icon mui-icon-email img2"></span>
                    <div class="mui-media-body">图片分享</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 ">
            <router-link to="/goods/goodslist" >
                    <span class="mui-icon mui-icon-home img3"></span>
                    <div class="mui-media-body">商品购买</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 ">
            <router-link to="/" >
                    <span class="mui-icon mui-icon-home img4"></span>
                    <div class="mui-media-body">留言反馈</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 ">
            <router-link to="/" >
                    <span class="mui-icon mui-icon-home img5"></span>
                    <div class="mui-media-body">视频专区</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 ">
            <router-link to="/" >
                    <span class="mui-icon mui-icon-home img6"></span>
                    <div class="mui-media-body">联系我们</div>
            </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import {HTTP} from '../config/server.js'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imglist: []
    }
  },
  mounted(){
      this.$nextTick(()=>{
          HTTP.get('api/getlunbo').then((res) => {
            this.imglist = res.data.message
          })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  position: relative;
}
img{
  height: 100%;
  width: 100%;
}
.hello .mui-grid-view.mui-grid-9 .mui-media {
    background-color: #fff;
}

.hello .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border:none;
}
/*覆盖原本的*/
  .img1::before,
  .img2::before,
  .img3::before,
  .img4::before,
  .img5::before,
  .img6::before{
    content:'';
    display: inline-block;
    width: 50px;
    height: 50px;
    background-repeat: round!important;
  }
  /*.mui-icon.mui-icon-home:nth-of-type(1)::before{
    background:url(../../statics/imgs/1.png) no-repeat;
    background-color: red;
    background-repeat: round;
  }*/
  .img1::before{
    background:url(../assets/imgs/1.png) no-repeat;
  }
  .img2::before{
    background:url(../assets/imgs/2.png) no-repeat;
  }
  .img3::before{
    background:url(../assets/imgs/3.png) no-repeat;
  }
  .img4::before{
    background:url(../assets/imgs/4.png) no-repeat;
  }
  .img5::before{
    background:url(../assets/imgs/5.png) no-repeat;
  }
  .img6::before{
    background:url(../assets/imgs/6.png) no-repeat;
  }
</style>
