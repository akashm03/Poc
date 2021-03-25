import { localController } from "../controller/localTargetController";

export const service = {
    async getStatus(){
       return localController.getJobStatus();
    },
    
    async find(){
        return localController.findById();
    },
};