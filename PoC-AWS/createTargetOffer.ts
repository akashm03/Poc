const AWS = require("aws-sdk")
export const handler = async (event: any, context: any, callback: any) => {
    let awsConfig = {
        "region": process.env.REGION,
        // "endpoint": process.env.END_POINT,
        "accessKeyId": process.env.ACCESS_KEY_ID, "secretAccessKey": process.env.SECRET_KEY
    }
    AWS.config.update({ awsConfig });
    //create the dunamodb service object
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const tarId = Math.round(Math.random()*1000000);
    var currentDate = new Date();
    
   const params:any = {
       TableName:"targetedoffer",
       Item: { 
           targetId: tarId,
           userId:145098,
           promotionId:918850,
           creationTime:currentDate.getTime()
        }
   }
   try{
    const data = await documentClient.put(params).promise();
   }catch(err){
       console.log(err);   
   } 
};


