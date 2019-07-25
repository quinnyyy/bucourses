import express = require('express');
import { MongoHelper } from './mongoHelper';
import cors = require('cors');

const app: express.Application = express();
app.use(cors());
var courseInfo: any;


app.get('/class', (req, res) => {
    let code: string | undefined = req.query.code;

    courseInfo.findOne({Code: code})
        .then((doc: any) => {
            if (!doc)
                throw new Error('No record found');
            res.send(doc);
        })
});

app.listen(3000, async () => {
    console.log('example app listening on port 3000!');
    try {
        let connection: any = await MongoHelper.connect();
        courseInfo = connection.db('bucourses_db').collection('course_info');
        console.log('connection successful :)');
    } catch(err) {
        console.error('whoops!', err);
    }
});