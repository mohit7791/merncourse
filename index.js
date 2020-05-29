const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const url='mongodb://localhost:27017/';
const dbname='confusion';
const dboper=require('./operations');
MongoClient.connect(url).then((client)=>{
   
    console.log('Connected to server');
    const db=client.db(dbname);
    // const collection=db.collection('dishes');
    dboper.insertDocument(db,{name:"Coconut" ,description:'test'},'dishes').then((result)=>{
   console.log("Insert document",result.ops);
   return dboper.findDocument(db,'dishes').then((docs)=>{
       console.log("found document",docs);}) 
       return dboper.updateDocument(db,{name:"Coconut"},{description:"Update test"},'dishes').then((result)=>{
           console.log("Updated document",result.result);})
           dboper.findDocument(db,'dishes').then((docs)=>{
            console.log("found document",docs);});

            return db.dropCollection('dishes').then((result)=>{
                console.log("dropped result",result);
                client.close();})
            })
           })
.catch((err)=>console.log(err));