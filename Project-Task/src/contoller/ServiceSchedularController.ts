import db from '../models/index';
import { Op } from 'sequelize';

const promotionD = db.promotionDetails;
const userTable = db.userTable;
const targetTable = db.targetedOfferTable;
const service ={};

//1.where jobStatus="PENDING" 
//@ts-ignore
service.findAllPromotionDetails = (req, res)=>{
    console.log(req.body);
    promotionD.findAll({
        attribute:['jobStatus','jobStartTimeEPoch','creationTime'],
        where:{
            jobStatus:"PENDING", 
            creationTime: {//a<b
                [Op.lte]:new Date(Date.now()).toISOString()
            }
        },
//@ts-ignore
}).then(data=>{
    res.status(200).send(data);
    //@ts-ignore
}).catch(err=>{
    res.status(500).send({
        message:err.message || 'Data not found in given table'
    });
});
};

//2.orderby start time
//@ts-ignore
service.findOrderByStartTime = (req,res)=>{
    promotionD.findAll({
        order:[
            ['jobStartTimeEpoch','ASC']
      ],
        limit:[3],
        attribute:['jobStartTimeEpoch']
    //@ts-ignore
    }).then(data=>{
        if(data){
            promotionD.update(
                { jobStatus: 'PROCESSING' },
                { where:
                    {$or: [ { jobStatus: { $eq: 'COMPLETED'}},{ jobStatus: { $eq: 'PENDING'}}]}  
                }
            )
        }
        res.status(200).send(data);
    }).catch(()=>{
        res.status(500).send({
            msg:"Data not found"
        });
    });
};

//3.getting userId from table
//@ts-ignore
service.findAllUserId = (req, res)=>{
    promotionD.findAll({
        // attribute:['minAge', 'maxAge', 'gender'],
        where:{
            minAge:req.body.minAge,
            maxAge:req.body.maxAge,
            gender:req.body.gender
        }
    //@ts-ignore
    }).then(data=>{
       if(data.gender === userTable.gender){
        res.status(200).send(data);
       }
        //@ts-ignore
    }).catch(error=>{
        res.status(500).send({
            message:error.message || "Error occured while retriving data"
        });
    });
};

//Create promotionData 
//@ts-ignore
service.createPromotionData = (req, res)=>{
    const promotion = {
        name : req.body.name,
        minAge : req.body.minAge,
        maxAge : req.body.maxAge,
        gender: req.body.gender,
        jobStatus:req.body.jobStatus,
        jobStartTimeEpoch : new Date(req.body.jobStartTimeEpoch).toISOString(),
        jobEndTimeEpoch : new Date(req.body.jobEndTimeEpoch).toISOString(),
        creationTime : new Date(Date.now()).toISOString()
    };
    promotionD.create(promotion)
    .then((data: any) =>{
        res.status(200).send(data);
    })
    .catch(() => {
        res.status(500).send({
            msg:"error in sending data"
        });
    });
};

//create userData
//@ts-ignore
service.createUserData = (req, res)=>{
    const userData = {
        username :req.body.username,
        email : req.body.email,
        dob : req.body.dob,
        gender:req.body.gender
    };
    userTable.create(userData)
    .then((data:any)=>{
        res.status(200).send(data);
    })
    .catch(()=>{
        res.status(500).send({
            msg:"error while sending data"
        });
    });
};

//4.create targeted Offer
//@ts-ignore
service.createTargetedOffer = (req, res)=>{
    const targetOffer = {
        userUserId : req.body.userUserId,
        promotionDetailPromotionDetId : req.body.promotionDetailPromotionDetId,
        creationTime : new Date(Date.now()).toISOString()
    };
    targetTable.create(targetOffer)
    .then((data:any)=>{
        if(data){
            promotionD.update(
                { jobStatus: 'COMPLETED' },
                { where: { promotionDetId: req.body.promotionDetailPromotionDetId } }
            )
        }
        res.status(200).send(data);
    })
    .catch(()=>{
        res.status(500).send({
            msg:"error while sending data"
        });
    });
    
};

//call function in every 5 min
// const minute = 5;
// var interval = minute * 60 * 1000;
// setInterval(()=>{
//     console.log("Doing my 5 min check");
    
// },interval);

export default service;