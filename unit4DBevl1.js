const express= require("express")

const mongoose= require("mongoose");

const connect=() =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/Naukri");
}
const app=express();
app.use(express.json());



const JobSchema=new mongoose.Schema({
    jobname:{type:String,required:true},
    city:{ type:String,required:true},
    skils:{type:String,required:true},
    rating:{type:Number,required:true},
    workfromhome:{type:String,required:true},
    company:{type:String,required:true},
    notice:{type:Number,required:true },
},
    {
        versionkey:false,
        timestamps:true
    }
);

const Job=mongoose.model("jobs",JobSchema);
    

const companySchema=new mongoose.Schema({
    name:{
        type:String,required:true
    },
    jobs:{
         type:Number,required:true
    }
},
{
     
    versionkey:false,
    timestamps:true
}
);
const Company= mongoose.model("company",companySchema);


const WorkSchema=new mongoose.Schema({
    city:{type:String,required:true},
    jobname:{type:String,required:true},
    job_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobs",
        required:true,
    },
    
},
{
     
    versionkey:false,
    timestamps:true
})
const WorkFromHome=mongoose.model("workfrom", WorkSchema);



const RatingSchema=new mongoose.Schema({
    jobname:{type:String,required:true},
    job_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobs",
        required:true,
    },
    
},
{
     
    versionkey:false,
    timestamps:true
})
const Rating=mongoose.model("rating", RatingSchema);



const SkillSchema=new mongoose.Schema({
    jobname:{type:String,required:true},
    job_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobs",
        required:true,
    },
    
},
{  
    versionkey:false,
    timestamps:true
}
)
const Skill=mongoose.model("skill", SkillSchema);


const NoticeSchema=new mongoose.Schema({
    jobname:{type:String,required:true},
    job_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobs",
        required:true,
    },
    
},
{
     
    versionkey:false,
    timestamps:true
})
const Notice=mongoose.model("notice", NoticeSchema);







app.post("/jobs",async(req,res)=>{
    try{
        const job=await Job.create(req.body);
        return res.status(201).send(job);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})
app.get("/jobs",async(req,res)=>{
    try{
        const jobs=await Job.find();
        return res.status(201).send(jobs);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})
app.get("/jobs/:id",async(req,res)=>{
    try{
        const jobs=await Job.find(req.params.id).lean().exec();
        return res.send({jobs});
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})



app.post("/notice",async(req,res)=>{
    try{
        const job=await Notice.create(req.body);
        return res.status(201).send(job);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.get("/notice",async(req,res)=>{
    try{
        const jobs=await Notice.find();
        return res.send({jobs});
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})
app.get("/notice/:id",async(req,res)=>{
    try{
        const jobs=await Notice.find(req.params.id).lean.exec();
        return res.send({jobs});
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})


app.post("/skill",async(req,res)=>{
    try{
        const job=await Skill.create(req.body);
        return res.status(201).send(job);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.get("/skill",async(req,res)=>{
    try{
        const jobs=await Skill.find();
        return res.send({jobs});
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})
app.get("/skill/:_id",async(req,res)=>{
    try{
        const jobs=await Skill.find(req.params.id).populate("job_id");
        return res.send({jobs});
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.post("/rating",async(req,res)=>{
    try{
        const job=await Rating.create(req.body);
        return res.status(201).send(job);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.get("/rating",async(req,res)=>{
    try{
        const jobs=await Rating.find().sort({"rating":-1}).lean.exec();
        return res.send({jobs});
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})
app.get("/rating/:id",async(req,res)=>{
    try{
        const jobs=await Rating.find(req.params.id).lean.exec();
        return res.send({jobs});
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.post("/workfrom",async(req,res)=>{
    try{
        const job=await WorkFromHome.create(req.body);
        return res.status(201).send(job);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.get("/workfrom",async(req,res)=>{
    try{
        const jobs=await WorkFromHome.find();
        return res.send({jobs});
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})


app.get("/workfrom/:job_id",async(req,res)=>{
    try{
        const jobs=await WorkFromHome.find(req.params.id);
        return res.send({jobs});
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})
app.post("/company",async(req,res)=>{
    try{
        const job=await Company.create(req.body);
        return res.status(201).send(job);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})


app.get("/company",async(req,res)=>{
    try{
        const jobs=await Company.find().lean.exec();
        return res.send({jobs});
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})

app.get("/company/:_id",async(req,res)=>{
    try{
        const jobs=await Company.find(req.params.id).lean().exec();
        return res.send(jobs);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})



app.listen(2345,async function(){
    await connect();
    console.log("listening on port 2345");

})