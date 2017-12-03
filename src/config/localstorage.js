export const key = 'transferlocal'
export const valueObj = {goodsid: 0, count: 0};

export let getItem = () =>{
	let jsonString = localStorage.getItem(key)
	jsonString = jsonString || '[]'
	return JSON.parse(jsonString) 
}

export let setItem = (value) =>{
	let arr = getItem();
	// console.log(key)
	// window.localStorage.removeItem(key)
	let flag = false; //假设是没有相同的
	if(arr.length != 0) {
		arr.forEach((item, index) => {
			if(item.goodsid == value.goodsid) {
				//如果有一样的 那么在原来的基础上加上数字
				flag = true;
				item.count = item.count + value.count
			}
		})
		if(!flag) {
			arr.push(value) 
		}
	}else{
		arr.push(value)
	}
	// console.log(arr)
	localStorage.setItem(key, JSON.stringify(arr))
	// console.log('下来了')
}

export let removeItem = (goodsid) => {
	let arr = getItem()
	console.log('进来了')
	arr.forEach((item, index) => {
		if(item.goodsid == goodsid) {
			console.log('删除了')
			arr.splice(index, 1)
			return;
		}
	})
	localStorage.setItem(key, JSON.stringify(arr))
}


export let getGoodsObj = () => {
	let arr = getItem();
	let goodsObj = {}

	arr.forEach((item, index) => {
		if(!goodsObj[item.goodsid]) {
			goodsObj[item.goodsid] = item.count
		}else{
			goodsObj[item.goodsid] += item.count

		}
	})

	return goodsObj;
}

export let updateLocal = ( obj ) => {
	let arr = getItem();
	const count = 1;
	if( obj.type == 'add' ) {
		setItem( {goodsid: obj.goodsid, count: count} )
	}else {
		for(var i = 0; i < arr.length; i++) {
			let item = arr[i]
			if(item.goodsid == obj.goodsid) {
				if(item.count > 1) {
					item.count--
					break;
				}else{
					arr.splice(i, 1)
					break;
				}
			}
		}
		localStorage.setItem(key, JSON.stringify(arr))
	}
}

// 遍历现有的localstorage中的每一个对象
// 如果对象不存在
// 	arr.push(value)
// 	setItem()

// 如果对象存在
// removeItem('')
// reutrn ++
// setloa