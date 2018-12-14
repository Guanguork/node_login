const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../helpers/auth");

const Report = require("../models/report");
const Project = require("../models/project")

router.get("/reports", isAuthenticated, async (req, res, next) => {
    const reports = await Report.find({user: req.user.id})
    res.render("reports/reports", {reports});
  });

router.get('/reports/add', isAuthenticated, async (req, res, next) => {
    const  projects  = await Project.find({users: req.user.name})
    res.render('reports/new-report', {projects})
})

router.get('/reports/edit/:id', isAuthenticated, async (req, res) => {
    const report = await Report.findById(req.params.id)
    res.render('reports/edit-report', {report})
})

router.put('/reports/edit-report/:id', isAuthenticated, async (req, res) => {
    const {mounth, year, tasks, features, bugs} = req.body
    await Report.findByIdAndUpdate(req.params.id, {mounth, year, tasks, features, bugs})
    res.redirect('/reports')
})

router.delete('/reports/delete/:id', isAuthenticated, async (req, res) => {
    await Report.findByIdAndDelete(req.params.id)
    res.redirect('/reports')
})

router.post('/reports/new-report', isAuthenticated, async (req, res, next) => {
    const { mounth, year, tasks, features, bugs} = req.body
    
    const errors = []
    if(!mounth) {
        errors.push({text: 'Please fill mounth field'})
    }
    if(!year) {
        errors.push({text: 'Please fill year field'})
    }
    if(!tasks) {
        errors.push({text: 'Please fill task field'})
    } 
    
    if(errors.length > 0) {
        res.render('reports/new-report', {
            errors,
            mounth,
            year,
            tasks,
            features, 
            bugs
        })
    } else {
        const newReport = new Report({mounth, year, tasks, features, bugs})
        newReport.user = req.user.id
        await newReport.save()
        res.redirect('/reports')
    }
})

module.exports = router;
