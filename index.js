const fs = require('fs');
var axios = require('axios');
const { time } = require('console');

var valid = [];     //This will store the valid email ids and details which will be written to valid.json
var invalid = [];  //This will store the invalid email ids and details which will be written to invalid.jsonS
//  In the response section ,we will have to look for delivery _status which we will use for filtering our valid mails from the bulk mail list.

data = JSON.parse(fs.readFileSync(`./data/sample_mixed_data_for_test.json`));

const writeDate = (valid_data,invalid_data)=>{
  fs.writeFile(`./output/valid.json`,JSON.stringify(valid_data),error => console.log(error));
  fs.writeFile(`./output/invalid.json`,JSON.stringify(invalid_data),error => console.log(error));
}


const validator = (detail)=>{
 
  var info = JSON.stringify({
    "record": detail.email
  });

  var config = {
    method: 'post',
    url: 'https://api.kleanmail.com/record_verification/api_record',
    headers: { 
      'api_key': 'api_key::_pGu%2BOFsvtYnqUoIJtySe39nYsdU7xq5OWNusjZHonZ0%3D', 
      'Content-Type': 'application/json'
    },
    data : info
  };
  
  axios(config)
  .then(function (response) {
    // console.log(response.data);
    if(response.data.is_deliverable){
      new_data = {fname:detail.fname,lname:detail.lname,email:detail.email};
      valid.push(new_data)
      console.log(`${new_data.email} is valid`)
    }else {
      new_data = {fname:detail.fname,lname:detail.lname,email:detail.email};
      invalid.push(new_data)
      console.log(`${new_data.email} is invalid`)
    }
  })
  .catch(function (error) {
    console.log(error);
  }).finally(()=> {});
}

// data.forEach(x =>{
//   validator(x)
// })

var len = data.length;

function timer(){
  setTimeout(()=>{
    validator(data.pop())
    len = len-1;
    if(len>0){
     timer();
    }else {
      writeDate(valid,invalid)
    }
  },1000);
}

timer();
//writeDate(valid,invalid);

