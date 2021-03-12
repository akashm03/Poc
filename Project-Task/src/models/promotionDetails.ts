import { Sequelize } from "sequelize/types";
export default  (connection:Sequelize,DataTypes:any)=>{
    const promotionDetails = connection.define("promotionDetails",{
        promotionDetId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING
        },
        minAge: {
            type: DataTypes.STRING
        },
        maxAge: {
            type: DataTypes.STRING
        },
        gender:{
            type:DataTypes.STRING
        },
        jobStatus:{
            type: DataTypes.STRING
        },
        jobStartTimeEpoch:{
            type: DataTypes.DATE
        },
        jobEndTimeEpoch:{
            type: DataTypes.DATE
        },
        creationTime:{
            type:DataTypes.STRING
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    return promotionDetails;
};