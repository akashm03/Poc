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
    try{
    const params: any = {
        TableName: "promotionoffer",
        Key: {
            promotionId: 918850
        }
    }
    let result = await documentClient.get(params).promise()
    console.log(result);
    ;
    }catch(error){
        console.log(error);
        
    }
};

