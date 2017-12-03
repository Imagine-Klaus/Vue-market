<template>
  <div id="app">
      <!-- <el-container id="container"> -->
          <el-header id="header">一个神奇的商城</el-header>
          <div v-if="isshow" id="back">
            <a href="javascript:void(0)" @click="backto">返回</a>
          </div>
          <router-view id="temp"> </router-view> 
            <nav class="mui-bar mui-bar-tab">
                <router-link to="/" class="mui-tab-item mui-active" >
                  <span class="mui-icon mui-icon-home"></span>
                  <span class="mui-tab-label">首页</span>
                </router-link>

                <router-link to="/h" class="mui-tab-item">
                  <span class="mui-icon mui-icon-email"></span>
                  <span class="mui-tab-label">消息</span>
                </router-link>

                <router-link to="/cart/shoppingcart" class="mui-tab-item">
                  <span class="mui-icon mui-icon-contact"><span ref="count" class="mui-badge" >0</span></span>
                  <span class="mui-tab-label">购物车</span>
                </router-link>

                <router-link to="/d" class="mui-tab-item">
                  <span class="mui-icon mui-icon-gear"></span>
                  <span class="mui-tab-label">设置</span>
                </router-link>
            </nav>
      <!-- </el-container> -->

  </div>
</template>

<script>
import Bus from '@/config/bus.js'
import { getGoodsObj } from '@/config/localstorage.js'
export default {
  name: 'app',
  watch:{
    '$route': function(newrouter, oldrouter){
        if(newrouter.path.toLowerCase() == '/') {
            this.isshow = false;
        }else{
            this.isshow = true;
        }
    }
  },
  data() {
      return {
          isshow: true          
      }
  },
  mounted() {
      let dom  = this.$refs.count
      this.$nextTick((res) => {
          this.init(dom)
          Bus.$on('refresh', function(res) {
               let goodsObj = getGoodsObj()
               let total_count = 0;
               for( var k in goodsObj) {
                   total_count+= goodsObj[k]
               }
               dom.innerText = parseInt(total_count)
          })
      })
  },
  methods: {
      init(dom) {
          let goodsObj = getGoodsObj()
          let total_count = 0;
          for( var k in goodsObj) {
               total_count+= goodsObj[k]
          }
          dom.innerText = parseInt(total_count)
      },
      backto() {
          this.$router.go(-1);
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#header {
  height: 50px!important;
  line-height: 50px;
  background: skyblue;
  color: #fff;
}
#back{
  width: 60px;
  position: absolute;
  top:10px;
  left:10px;
  z-index: 101;
}
#back a{
  color:white;
  font-size: 16px;
  font-weight: bold;
}

</style>
