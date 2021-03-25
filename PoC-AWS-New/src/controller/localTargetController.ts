import AWS from "aws-sdk";

//create the dynamodb service object
const documentClient = new AWS.DynamoDB.DocumentClient();
const date = new Date();
const currTime = date.getTime();

export const localController = {
    async getJobStatus(){
        const params:any = {
            TableName:"promotionOffer",
            FilterExpression: "jobStartTimeEpoch <= :currentTime and jobStatus = :jobs",
            ExpressionAttributeValues:{
                ':jobS':"PENDING",
                ':currentTime': currTime
            },
        }
        return await documentClient.scan(params).promise()
    },

    async findById(){
        const params: any = {
            TableName: "promotionoffer",
            FilterExpression: "minAge= :min and maxAge= :max and gender= :gen",
            ExpressionAttributeValues:{
              ":min":25,
               ":max":50,
               ":gen": "MALE"  
            },
            ProjectionExpression: "promotionId"
        }
        return await documentClient.scan(params).promise()
    }
}