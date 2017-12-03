import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import axios from 'axios'
import vueAxios from 'vue-axios'
import newslist from '@/page/news/newslist'
import newsinfo from '@/page/news/newsinfo'
import picshare from '@/page/pic/picshare'
import picinfo from '@/page/pic/picinfo'
import goodslist from '@/page/goods/goodslist'
import goodsinfo from '@/page/goods/goodsinfo'
import shoppingcart from '@/page/cart/shoppingcart'
Vue.use(Router)

export default new Router({
	mode: 'hash',
	linkActiveClass: 'mui-active',
	routes: [
		{
			path: '/',
			name: 'home',
			component: home
		},
		{
			path: '/newslist',
			name: 'newsList',
			component: newslist				
		},
		{
			path: '/newsinfo',
			name: 'newsinfo',
			component: newsinfo
		},
		{
			path: '/picshare',
			name: 'picShare',
			component: picshare
		},
		{
			path: '/picinfo/:id',
			name: 'picInfo',
			component: picinfo
		},
		{
			path: '/goods/goodslist',
			name: 'goodsList',
			component: goodslist
		},
		{
			path: '/goods/goodsinfo/:id',
			name: 'goodsinfo',
			component: goodsinfo
		},
		{
			path: '/cart/shoppingcart',
			name: 'shoppingcart',
			component: shoppingcart
		}
	]
})
