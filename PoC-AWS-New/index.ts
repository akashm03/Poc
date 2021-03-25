import AWS from "aws-sdk";
import { service }  from "./src/service/localTargetService"

export const handler = async (event: any, context: any, callback: any) => {
    
    AWS.config.update({  
        "region": process.env.REGION,
        "accessKeyId": process.env.ACCESS_KEY_ID, 
        "secretAccessKey": process.env.SECRET_KEY 
    });
    //create the dynamodb service object
    const documentClient = new AWS.DynamoDB.DocumentClient();
    try{
    // const result = service.getStatus();
    const result = service.find();
    console.log(result);
    }catch(error){
        console.log(error);
    }

};

