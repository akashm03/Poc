const AWS = require("aws-sdk")
export const handler = async (event: any, context: any, callback: any) => {
    let awsConfig = {
        "region": process.env.REGION,
        // "endpoint": process.env.END_POINT,
        "accessKeyId": process.env.ACCESS_KEY_ID, 
        "secretAccessKey": process.env.SECRET_KEY
    }

    AWS.config.update({ awsConfig });

    let date = new Date();
    let currTime = date.getTime();
    // & Key('jobStartTimeEpoch').lt(currentTime),
    //create the dynamodb service object
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
    const documentClient = new AWS.DynamoDB.DocumentClient();
    try{
    const params: any = {
        TableName: "promotionoffer",
        FilterExpression: "jobStartTimeEpoch <= :currentTime and jobStatus = :jobS",
        ExpressionAttributeValues:{
            ':jobS':'PENDING',
            ':currentTime': currTime
        },
        
    }
    let result = await documentClient.scan(params).promise()
    console.log(result);
    ;
    }catch(error){
        console.log(error);
        
    }
};

