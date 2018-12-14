const express = require("express");
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth');

const Project = require("../models/project");

router.get("/projects", isAuthenticated, async (req, res, next) => {
  const projects = await Project.find()
  res.render("projects/projects", {projects})
});

router.get('/projects/add', isAuthenticated, (req, res, next) => {
  res.render('projects/new-project')
})

router.get('/projects/edit/:id', isAuthenticated, async (req, res, next) => {
  const project = await Project.findById(req.params.id)
  res.render('projects/edit-project', {project})
})

router.put('/projects/edit-project/:id', isAuthenticated, async (req, res, next) => {
  const {title, users} = req.body
  await Project.findByIdAndUpdate(req.params.id, {title, users})
  res.redirect('/projects')
})

router.post('/projects/new-project', isAuthenticated, async (req, res, next) => {
  const {title, users} = req.body
  const errors = []
  if(!title) {
    errors.push({text: 'Please fill title field'})
  }
  if(errors.length > 0) {
    res.render('projects/new-project', {errors, title, users})
  } else {
    const newProject = new Project({title, users})
    newProject.users.push(req.user.name)
    await newProject.save()
    res.redirect('/projects')
  }
})

module.exports = router;