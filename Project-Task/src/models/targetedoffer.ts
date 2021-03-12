import { Sequelize } from "sequelize/types";


export default  (connection:Sequelize,DATATYPE:any)=>{
    const TARGETOFFER = connection.define("targetedOffer",{
        creationTime:{
            type:DATATYPE.DATE
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });  
    return TARGETOFFER;
  
};