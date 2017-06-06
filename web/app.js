const express = require('express')
const app = express()
const execSync = require('child_process').execSync;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/producer', function (req, res) {
  var result = produce()
  res.send(result)
})

app.get('/producer', function (req, res) {
  var result = produce()
  res.send(result)
})

function produce(){
    var json = execSync('cd ../;gradle -Pjson=whatever produce').toString('utf8').match(/realex_start\n(.*)\nrealex_end/)[1]

    console.log("produced json: "+json);
    console.log("base64 decoded: "+JSON.stringify(base64Decode(JSON.parse(json))));
    return json
}

app.post('/consumer', function (req, res) {
    var json = JSON.parse(req.body["hppResponse"]);
    var jsonString = JSON.stringify(json);
    console.log("json sent to consumer: "+jsonString);
    console.log("base64 decoded: "+JSON.stringify(base64Decode(json)));
    var result = execSync('cd ../;gradle -Pjson=\''+jsonString+'\' consume').toString('utf8').match(/realex_start\n(.*)\nrealex_end/)[1];
    result = JSON.parse(result)
    console.log("consumed: "+JSON.stringify(base64Decode(result)));
    res.send(result);
})

function base64Decode(obj){
    for(var k in obj){
      if(obj.hasOwnProperty(k)){
          console.log("transforming: "+k +" : " + obj[k]);
          if(obj[k]){
              var result = new Buffer(obj[k], 'base64').toString('utf8')
              obj[k] = result;
          } else {
            console.log("ignored empty key: "+k);
          }
      }
    }
    return obj
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
