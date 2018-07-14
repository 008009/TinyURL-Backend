const urlModel = require('./urlModel');

//["a", ... ,"z", "A", ... ,"Z", 0, ..., 9]
const encode = ["a","b","c","d","e","f","g",
                "h","i","j","k","l","m","n",
                "o","p","q","r","s","t","u",
                "v","w","x","y","z",
                "A","B","C","D","E","F","G",
                "H","I","J","K","L","M","N",
                "O","P","Q","R","S","T","U",
                "V","W","X","Y","Z",
                "0","1","2","3","4","5","6",
                "7","8","9"]; 

const getshortUrl = (longUrl, callback) =>{
    urlModel.findOne({longUrl: longUrl}, (err, res)=>{
        if(res){
            callback(res);
        }else{
            urlModel.countDocuments((err, count) => {
                const shortUrl = generateShortUrl(count);
                const url = urlModel({shortUrl:shortUrl, longUrl:longUrl});
                url.save();
                callback(url);
            })
        }
    })
}

const generateShortUrl = (num) =>{
    let result = "";
    if(num === 0) {
        return "a"
    }else{
        while(num > 0) {
            result = encode[num % 62] + result;
            num = Math.floor(num / 62);
        }
        return result;
    }
}

const getlongUrl = function(shortUrl, callback) {
    urlModel.findOne({shortUrl: shortUrl}, (err, url) => {
        callback(url);
    })
} 

module.exports = {
    getshortUrl: getshortUrl,
    getlongUrl: getlongUrl
};