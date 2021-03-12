import dbConfig from '../config/db.config';
import Sequelize from 'sequelize';
import userModel from '../models/user';
import targetedOfferModel from '../models/targetedoffer';
import promotionDetailsModel from '../models/promotionDetails';

//@ts-ignore
const connection = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
    operatorsAliases : false,
    pool : {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

//creating db as json object
const db:any = {};

//adding reference to db so we can refer that in another  file
db.Sequelize = Sequelize;
db.connection = connection;

db.userTable = userModel (connection,Sequelize);
db.targetedOfferTable = targetedOfferModel (connection,Sequelize);
db.promotionDetails = promotionDetailsModel (connection,Sequelize);

db.userTable.hasMany(db.targetedOfferTable);
db.targetedOfferTable.belongsTo(db.userTable);

db.promotionDetails.hasOne(db.targetedOfferTable);
db.targetedOfferTable.belongsTo(db.promotionDetails);

export default db;
