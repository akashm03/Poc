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
    const promoId = Math.round(Math.random()*1000000);
    const jobStartTime = Math.floor(new Date().getTime()/1000.0);
    const date = new Date();
    const currTime = date.getTime();

   const params:any = {
       TableName:"promotionoffer",
       Item: { 
           promotionId: promoId,
           name:"Suraj",
           minAge:20,
           maxAge:50,
           gender:"MALE",
           jobStatus:"COMPLETED",
           jobStartTimeEpoch:jobStartTime,
           jobEndTimeEpoch:254512586,
           currentTime:currTime
        }
   }
   try{
    const data = await documentClient.put(params).promise();
   }catch(err){
       console.log(err);   
   }
};


