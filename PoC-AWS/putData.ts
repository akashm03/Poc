const AWS = require("aws-sdk")
export const handler = async (event: any, context: any, callback: any) => {

    let awsConfig = {
        "region": "us-east-1",
        "endpoint": "https://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": "AKIA5PMDQWVB5VR4QC22", "secretAccessKey": "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"
    }
    AWS.config.update({ awsConfig });
    //create the dunamodb service object
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const promoId = Math.round(Math.random()*1000000);
    const jobStartTime = Math.floor(new Date().getTime()/1000.0);

   const params:any = {
       TableName:"promotionoffer",
       Item: { 
           promotionId: promoId,
           name:"Suraj",
           minAge:20,
           maxAge:50,
           gender:"MALE",
           jobStartTimeEpoch:jobStartTime,
           jobEndTimeEpoch:254512586
        }
   }
   try{
    const data = await documentClient.put(params).promise();
   }catch(err){
       console.log(err);   
   }
};


