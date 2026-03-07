const express = require("express");
const router = express.Router();

const controller = require("../controllers/studentController");

router.get("/",controller.getStudents);

router.get("/add",controller.showAddForm);

router.post("/add",controller.addStudent);

router.get("/edit/:id",controller.showEditForm);

router.post("/edit/:id",controller.updateStudent);

router.get("/delete/:id",controller.deleteStudent);

module.exports = router;