const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const getUrl = require('./getUrl');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://carl0809:Aa168600@ds231951.mlab.com:31951/url-database', { useNewUrlParser: true});


app.use(bodyParser.json());
app.use(cors());


app.get('/',(req, res)=> {
	res.send('this is working');
})

app.post('/api/urls', (req, res) => {
	let longUrl = req.body.longUrl;
	if(longUrl.indexOf("www") != -1 && longUrl.indexOf("http") === -1) {
		longUrl = "http://" + longUrl;
	}else if(longUrl.indexOf("www") === -1 && longUrl.indexOf("http" === -1)){
		longUrl = "http://www."+longUrl;
	}
	getUrl.getshortUrl(longUrl, function(url){
		res.json(url);
	})
})

app.get('/:shortUrl', (req, res) =>{
	const {shortUrl}  = req.params;
	getUrl.getlongUrl(shortUrl, function(url){
		if(url) {
			res.redirect(url.longUrl);
		}else{
			res.json("No such URL");
		}
	})
})

app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`);
})