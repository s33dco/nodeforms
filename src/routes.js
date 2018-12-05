const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator/check')


router.get('/', (req, res) => {
  res.render('index')
})

router.get('/contact', (req, res) => {
  res.render('contact', {
    data: {},
    errors: {},
    csrfToken: req.csrfToken()  // generate a csrf token
  })
})

router.post('/contact', [
  check('message')
    .isLength({ min: 1 })
    .withMessage('Message is required')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('That email doesn‘t look right')
    .trim()
    .normalizeEmail()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('contact', {
      data: req.body,
      errors: errors.mapped(),
      csrfToken: req.csrfToken()  // generate new csrf token
    })
  }

  console.log(req.body)

  req.flash('success', `Thanks for the message ${req.body.email}! I‘ll be in touch :)`)
  res.redirect('/')
})

module.exports = router
