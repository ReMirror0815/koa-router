const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const Router = require('koa-router')
const request = require('request')
const urlib = require('url')

let router = new Router()
const app = new Koa()

const staticPath = './Images'

app.use(static(
  path.join( __dirname,  staticPath)
))

router.get('/weigh', (ctx, next) => {
	const host = 'http://' + ctx.request.header.host + '/'
	 ctx.body = {
	  	code:200,
	    data:{
	        reporterCode: '上报终端编号',
	        licensePlateNumber: '沪A7791',
	        weighbridgeCode: '地磅编号',
	        weight:10000, // '称重重量，单位/g',
	        medias: [
	            {
	                type: 'prepositionCar',
	                url: host + 'test1.png',
	            },
	            {
	                type:'postpositionCar',
	                url: host + 'test2.png',
	            },
	            {
	                type:'postpositionCar',
	                url: host + 'test3.png',
	            },
	        ],
	        nonce: '通过这个nonce可以反查对方系统的记录',
	    },
	    resultMessage: '称重异常'
	 }
});


router.get('/dingding',async(ctx, next) => {
	const option = {
		method: 'post',
    	url: 'https://xxxxxxs.com/xxx',
    	headers: {		
	      'Content-Type': 'application/json',
	      'Accept': 'application/json'  // 需指定这个参数 否则 在特定的环境下 会引起406错误
	    },
	    json: {
				msgtype: 'text',
				text: {
					content:'[Boss][赞]' + '发布完成',//myobj.query.content,
	     	},
	     	"at": {		
	        	"atMobiles": [
	            	"",
	            	""
	        	],
	        	"isAtAll": false
	    	},
	    }
	}
	ctx.body = await new Promise((resolve)=>{
		request(option,(err,res,body)=>{
			resolve(body)
		})	
	})
});

app
  .use(router.routes())
  .use(router.allowedMethods()); 


app.listen(8088)