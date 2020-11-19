const AWS = require('aws-sdk');
const dynamodb =  new AWS.DynamoDB({
    region: 'ap-south-1',
    apiVersion: '2012-08-10'
});

exports.handler =  (event,context,callback) =>
{
 if(event.httpMethod == "POST")addUser(event,context,callback);
 if(event.httpMethod == "GET")getUsers(event,context,callback);
}


const getUsers=(event,context,callback)=>
{
    
const params = {
TableName: "users"
}
       
dynamodb.scan(params, function(err, data)
{
if(err)
{
console.log(err);
}
else 
{
 
const items=data.Items.map(item=>
{
    return {"name":item.name.S, "email":item.email.S, "desc":item.desc.S}
})
callback(null, { statusCode: 200,body: JSON.stringify(items),headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}});
}
})
}

const addUser=(event,context,callback)=>
{
let evnt=JSON.parse(event.body);
const params = {
      Item:{
          "id": {
              
            S:"user_"+ Math.random()  
          },
          "name" :{
              S: evnt.name
          },
          "email" :{
              S: evnt.email
          },
          "desc" :{
              S: evnt.desc
          }
      },
      TableName:"users"
  };
  
 dynamodb.putItem(params ,function(err, data) {
        if(err)
        {
    callback(null, { statusCode: 200,body: JSON.stringify({"added":false}),headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}});
        }
        else
        {
       callback(null,{ statusCode: 200, body: JSON.stringify({"added":true}),headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}});
        }
                                              })
    

}
