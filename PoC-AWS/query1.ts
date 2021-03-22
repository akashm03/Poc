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
        ExpressionAttributeValues:{
            ':jobStatus':'COMPLETED',
            // ':jobStartTimeEpoch': 1616398116,
            ':currentTime':{'n':currTime}
        },
        FilterExpression: 'jobStatus= :jobStatus AND jobStartTimeEpoch <= :currentTime',
        KeyConditionExpression: 'jobStatus= :js'
        // AND :jobStartTimeEpoch <= :currentTime' 
        
    }
    let result = await ddb.query(params).promise()
    console.log(result);
    ;
    }catch(error){
        console.log(error);
        
    }
};

