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
    let limit : number | undefined = parseInt(req.query.limit,10);
    let college: string | Array<string> | undefined = req.query.college;
    let credits: Array<number> = Array.isArray(req.query.credits) ? req.query.credits.map( (item : string) => {return parseInt(item,10)}) : [parseInt(req.query.credits,10)];
    let creditsMin: number | undefined = isUndefined(req.query.creditsmin) ? undefined : Number(req.query.creditsmin);
    let level : Array<number> = Array.isArray(req.query.level) ? req.query.level.map( (item : string) => {return parseInt(item,10)}) : [parseInt(req.query.level,10)];
    let levelMin : number | undefined = isUndefined(req.query.levelmin) ? undefined : Number(req.query.levelmin);

    if (!isUndefined(code)) {
        courseInfo.findOne({Code: code})
            .then((doc: any) => {
                if (!doc) {
                    throw new Error("Couldn't find this class");
                }
                res.send(doc);
            })
    }
    else {
        let filters : Array<any> = [];

        if(!isUndefined(college)) {
            let filter : any = {};
            if (typeof(college) == 'string') {
                filter = {College : college};
            } else {
                filter = {College : {$in : college}};
            }
            filters.push(filter);
        }

        if (!isNaN(credits[0]) && !isUndefined(creditsMin)) {
            filters.push({$or : [{Credits : {$in : credits}}, {Credits: {$gte : creditsMin}}]});
        }
        else if (!isNaN(credits[0])) {
            filters.push({Credits : {$in: credits}});
        }
        else if (!isUndefined(creditsMin)) {
            filters.push({Credits: {$gte : creditsMin}});
        }

        if (!isNaN(level[0]) || !isUndefined(levelMin)) {
            let conditions : Array<any> = [];

            if (!isNaN(level[0])) {
                level.forEach(level => {
                    conditions.push({Level: {$gte : level, $lt : level + 100}});
                });
            }

            if (!isUndefined(levelMin)) {
                conditions.push({Level: {$gte : levelMin}});
            }
            filters.push({$or : conditions});
        }

        let innerFind : any = filters.length == 0 ? {} : {$and: filters};

        if (!isUndefined(limit)) {
            courseInfo.find(innerFind).sort({Code: 1}).limit(limit).toArray( (err: any, result: any) => {
                if (err)
                    throw err;
                res.send(result);
            });
        }
        else {
            courseInfo.find(innerFind).sort({Code: 1}).toArray( (err: any, result: any) => {
                if (err)
                    throw err;
                res.send(result);
            });
        }
        
    }
})
/*
app.get('/class', (req, res) => {
    let code: string | undefined = req.query.code;
    let limit: number | undefined = isUndefined(req.query.limit) ? undefined : Number(req.query.limit);
    //let credits: number | undefined = isUndefined(req.query.credits) ? undefined : Number(req.query.credits);
    let credits: Array<number> = Array.isArray(req.query.credits) ? req.query.credits.map( (item : string) => {return parseInt(item,10)}) : [parseInt(req.query.credits,10)];
    let college: string | Array<string> | undefined = req.query.college;
    let className: string | undefined = req.query.className;
    //let creditsMax: number | undefined = isUndefined(req.query.creditsMax) ? undefined : Number(req.query.creditsMax);
    let creditsMin: number | undefined = isUndefined(req.query.creditsmin) ? undefined : Number(req.query.creditsmin);
    let level : Array<number> = Array.isArray(req.query.level) ? req.query.level.map( (item : string) => {return parseInt(item,10)}) : [parseInt(req.query.level,10)];
    let levelMin : number | undefined = isUndefined(req.query.levelmin) ? undefined : Number(req.query.levelmin);


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

        if (!isUndefined(college)) {
            if (typeof(college) == 'string') {
                filter.College = college;
            } else {
                filter.College = {$in: college};
            }
        }

        let orFlag : boolean = false;
        let filter1: any = JSON.parse(JSON.stringify(filter));

        if (!isNaN(credits[0]) && !isUndefined(creditsMin)) {
            filter1.Credits = {$in: credits};
            filter.Credits = {$gte: creditsMin};
            orFlag = true;
        }
        else if (!isNaN(credits[0])) {
            filter.Credits = {$in: credits};
        }
        else if (!isUndefined(creditsMin)) {
            filter.Credits = {$gte: creditsMin};
        }


        console.log(level);
        console.log(levelMin);

        let filters : Array<any> = [];

        if (!isNaN(level[0]) && !isUndefined(levelMin)) {
            filt
        }
        else if (!isNaN(level[0])) {

        }
        else if (!isUndefined(levelMin)) {

        }

        if (orFlag) {
            console.log(filter)
            console.log(filter1)
            courseInfo.find(
                {$or: [filter, filter1]}
            ).sort({Code: 1}).limit(limit).toArray( (err: any, result: any) => {
                if (err)
                    throw err;
                res.send(result);
            })
        }
        else {
            console.log('deez nuts')
            courseInfo.find(filter).sort({Code: 1}).limit(limit).toArray( (err: any, result: any) => {
                if (err)
                    throw err;
                res.send(result);
            });
        }
    }
});
*/
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