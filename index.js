const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const url='mongodb://localhost:27017/';
const dbname='confusion';
const dboper=require('./operations');
MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    console.log('Connected to server');
    const db=client.db(dbname);
    // const collection=db.collection('dishes');
    dboper.insertDocument(db,{name:"Coconut" ,description:'test'},'dishes',(result)=>{
   console.log("Insert document",result.ops);
   dboper.findDocument(db,'dishes',(docs)=>{
       console.log("found document",docs);
       dboper.updateDocument(db,{name:"Coconut"},{description:"Update test"},'dishes',(result)=>{
           console.log("Updated document",result.result);
           dboper.findDocument(db,'dishes',(docs)=>{
            console.log("found document",docs);
            db.dropCollection('dishes',(result)=>{
                console.log("dropped result",result);
                client.close();
            })
           })
       })
   })
    });

})