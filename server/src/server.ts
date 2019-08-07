import express = require('express');
import { MongoHelper } from './mongoHelper';
import cors = require('cors');
import { isNullOrUndefined, isUndefined } from 'util';

const app: express.Application = express();
app.use(cors());
var courseInfo: any;


// Example query: /class?limit=10&college=Engineering&creditsMax=3&creditsMin=0
// Get 10 classes, college = Engineering, 0 < # of credits < 3

// Example query: /class?code=cas-cs-131
// Get the class with code = cas-cs-131

// example query: /class?limit=10&credits=4
// Get 10 classes that are 4 credits

app.get('/class', (req, res) => {
    let code: string | undefined = req.query.code;
    let limit: number | undefined = isUndefined(req.query.limit) ? undefined : Number(req.query.limit);
    let credits: number | undefined = isUndefined(req.query.credits) ? undefined : Number(req.query.credits);
    let college: string | Array<string> | undefined = req.query.college;
    let className: string | undefined = req.query.className;
    let creditsMax: number | undefined = isUndefined(req.query.creditsMax) ? undefined : Number(req.query.creditsMax);
    let creditsMin: number | undefined = isUndefined(req.query.creditsMin) ? undefined : Number(req.query.creditsMin);

    console.log(college);

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
        } else if (!isUndefined(creditsMin) && !isUndefined(creditsMax)) {
            filter.Credits = {$gte: creditsMin, $lte: creditsMax};
        } else if (!isUndefined(creditsMin)) {
            filter.Credits = {$gte: creditsMin};
        } else if (!isUndefined(creditsMax)) {
            filter.Credits = {$lte: creditsMax};
        }

        if (!isUndefined(college)) {
            if (typeof(college) == 'string') {
                filter.College = college;
            } else {
                filter.College = {$in: college};
            }
        }

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