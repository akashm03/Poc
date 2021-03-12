import { Sequelize } from "sequelize/types";

export default  (connection:Sequelize,DataTypes:any)=>{
    const USER = connection.define("user",{
        userId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        dob: {
            type: DataTypes.DATE
        },
        gender:{
            type: DataTypes.STRING
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    
    return USER;
};