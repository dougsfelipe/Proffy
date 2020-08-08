import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req,res) => {
   

    return res.json({Message: 'Hello World'});
});



app.listen(3333);