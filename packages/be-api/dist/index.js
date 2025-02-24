'use strict';var k=require('express'),m=require('mongoose');function _interopDefault(e){return e&&e.__esModule?e:{default:e}}var k__default=/*#__PURE__*/_interopDefault(k);var m__default=/*#__PURE__*/_interopDefault(m);var l=async()=>{await m__default.default.connect(process.env.MONGO_URI||"mongodb://127.0.0.1:27017/flexim");},d=async()=>{await m__default.default.disconnect();};var f=new m.Schema({name:{type:String,required:true},country:{type:String,required:true}});var o=m.model("Supplier",f);var S=new m.Schema({sku:{type:String,required:true,unique:true},name:{type:String,required:true},description:{type:String,required:true},supplierId:{type:m.Schema.Types.ObjectId,ref:o,required:true},manufacturingDate:{type:Date,required:true}});var P=m.model("Product",S);async function y({page:t=1,limit:e=50,sortField:r="sku",sortOrder:n="asc",searchTerm:i=""}){let w=(t-1)*e,a={};i&&(a.$or=[{sku:{$regex:i,$options:"i"}},{name:{$regex:i,$options:"i"}}]);let s={};r==="supplier"?s["supplier.name"]=n==="asc"?1:-1:s[r]=n==="asc"?1:-1;let[c]=await P.aggregate([{$match:a},{$lookup:{from:"suppliers",localField:"supplierId",foreignField:"_id",as:"supplier"}},{$unwind:"$supplier"},{$facet:{data:[{$sort:s},{$skip:w},{$limit:e},{$project:{_id:1,sku:1,name:1,description:1,supplierId:"$supplier._id",manufacturingDate:1}}],total:[{$group:{_id:null,count:{$sum:1}}}]}}]),u=c.total[0]?.count||0;return {data:c.data,total:u,page:t,totalPages:Math.ceil(u/e)}}var $=async()=>await o.find().lean();var p=k__default.default(),x=8e3;p.get("/products",async(t,e)=>{let r=await y(t.query);e.send(r);});p.get("/suppliers",async(t,e)=>{let r=await $();e.send(r);});p.listen(x,async()=>{await l(),console.info(`\u{1F680} Server ready at port : ${x}`);});var I=async()=>{await d(),console.info("\u{1F6D1} Database connection closed."),process.exit(0);};process.on("SIGINT",I);process.on("SIGTERM",I);
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map