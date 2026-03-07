const Student = require("../models/student");

exports.getStudents = async (req,res)=>{

const students = await Student.find();

res.render("index",{students});

};

exports.showAddForm = (req,res)=>{
res.render("addStudent");
};

exports.addStudent = async (req,res)=>{

const {name,roll} = req.body;

await Student.create({name,roll});

res.redirect("/");

};

exports.showEditForm = async (req,res)=>{

const student = await Student.findById(req.params.id);

res.render("editStudent",{student});

};

exports.updateStudent = async (req,res)=>{

const {name,roll} = req.body;

await Student.findByIdAndUpdate(req.params.id,{name,roll});

res.redirect("/");

};

exports.deleteStudent = async (req,res)=>{

await Student.findByIdAndDelete(req.params.id);

res.redirect("/");

};