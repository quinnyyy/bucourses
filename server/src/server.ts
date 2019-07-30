import express = require('express');
import { MongoHelper } from './mongoHelper';
import cors = require('cors');
import { isNullOrUndefined, isUndefined } from 'util';

const app: express.Application = express();
app.use(cors());
var courseInfo: any;


// Current spec for this endpoint:
// If a class code is specified query for one class with this code
// If a class code is not specified but a limit is specified then give the first n classes
// If neither is specified throw an error

app.get('/class', (req, res) => {
    let code: string | undefined = req.query.code;
    let limit: number | undefined = isUndefined(req.query.limit) ? undefined : Number(req.query.limit);
    let credits: number | undefined = isUndefined(req.query.credits) ? undefined : Number(req.query.credits);
    let college: string | undefined = req.query.college;
    let className: string | undefined = req.query.className;

    console.log(code);
    console.log(req.query.limit);
    console.log(credits);

    if (isUndefined(code) && isUndefined(limit)) {
        throw new Error('Invalid query. Please specify field');
    }

    else if (!isUndefined(code)) {
        courseInfo.findOne({Code: code})
            .then((doc: any) => {
                if (!doc)
                    throw new Error("Couldn't find this class");
                res.send(doc);
            })
    }

    else if (!isUndefined(limit)) {
        let filter : any = {};
        if (!isUndefined(className)) {
            filter.ClassName = className;
        }
        if (!isUndefined(credits)) {
            filter.Credits = credits;
        }
        if (!isUndefined(college)) {
            filter.College = college;
        }
        console.log(filter);
        courseInfo.find(filter).sort({Code: 1}).limit(limit).toArray( (err: any, result: any) => {
            if (err)
                throw err;
            res.send(result);
        });
    }

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