<template>
	<div>
			<ul class="inputBox">
				<li @click="add">+</li>
				<li v-text="count"></li>
				<li @click="subtract">-</li>
			</ul>
	</div>
</template>
<script type="text/javascript">
	import Bus from '@/config/bus.js'
	export default {
		props: [ 'id', 'initCount' ],
		data() {
			return {
				count: 0,
				sendObj: {goodsid:0, type: ''}
			}
		},
		created() {
			if(this.initCount) {
				this.count = this.initCount
			}
			Bus.$on('refresh', (res) => {
				this.count = 0;
			})
		},
		methods: {
			add() {
				this.count++;
				this.send();
				this.goodsChange( 'add' )
			},
			subtract() {
				if(this.count == 0) {
					return false;
				}
				this.count--;
				this.send();
				this.goodsChange( 'subtract' )
			},
			send() {
				this.$emit('send', this.count)
			},
			goodsChange(type) {
				this.sendObj.goodsid = this.id;
				this.sendObj.type = type;

				//订阅者: shoppingcart
				Bus.$emit('goodsChange', this.sendObj)
			}
		}
	}
</script>
<style scoped>
	.inputBox {
		display: flex;
		border: 1px solid #ccc;
	}
	.inputBox > li {
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	.inputBox > li:nth-of-type(2) {
		border-right: 1px solid #ccc;
		border-left: 1px solid #ccc;
	}
</style>
