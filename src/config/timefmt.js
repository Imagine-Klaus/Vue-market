import Vue from 'vue'
import moment from 'moment'

Vue.filter('dataFmt', (input, fmtStr = 'YYYY-MM-DD' ) => {
	return moment( input ).format( fmtStr )
})