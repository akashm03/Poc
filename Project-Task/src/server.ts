import express from 'express';
import bodyParser from 'body-parser';

// import cors from 'cors';

import db from './models/index';
import serviceRouter from './routes/serviceSchedular';

const app:express.Application = express();

db.connection.sync().then(() =>{
    //console.log('Drop then resync db');
    console.log('database created');
    
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/localService',serviceRouter);

const PORT = process.env.PORT || 8085;
app.listen(PORT,() => {
    console.log(`Express server listening on port ${PORT}`);
}); 