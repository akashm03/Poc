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
    try{
    const params: any = {
        TableName: "promotionoffer",
        Key: {
            promotionId: 1
        }
    }
    let result = await documentClient.get(params).promise()
    console.log(result);
    ;
    }catch(error){
        console.log(error);
        
    }
};

