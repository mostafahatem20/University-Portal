const express = require('express')
const cors = require('cors')
const path = require('path')
const allRoutes = require('express-list-endpoints')
const { connectDB } = require('./config/dbConfig')
const staff = require('./api/routers/staff.router')
const leave = require('./api/routers/leave.router')
const schedule = require('./api/routers/schedule.router')
const slot = require('./api/routers/slot.router')
const faculty = require('./api/routers/faculty.router')
const replacement = require('./api/routers/replacement.router')
const attendence = require('./api/routers/attendence.router')
const department = require('./api/routers/department.router')
const notification = require('./api/routers/notification.router')
const course = require('./api/routers/course.router')
const courseStaff = require('./api/routers/courseStaff.router')
const location = require('./api/routers/location.router')
const salary = require('./api/routers/salary.router')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const explore = (req, res) => {
  const routes = allRoutes(app)
  const result = {
    ServiceList: [],
  }

  routes.forEach((route) => {
    const name = route.path.split('/')[5]
    result.ServiceList.push({
      Service: {
        name,
        fullUrl: `${route.path}`,
      },
    })
  })
  return res.json({ result, count: result.ServiceList.length })
}
app.use('/api/explore', explore)
app.use('/api/staff', staff)
app.use('/api/attendence', attendence)
app.use('/api/slot', slot)
app.use('/api/faculty', faculty)
app.use('/api/department', department)
app.use('/api/replacement', replacement)
app.use('/api/leave', leave)
app.use('/api/schedule', schedule)
app.use('/api/notification', notification)
app.use('/api/course', course)
app.use('/api/location', location)
app.use('/api/courseStaff', courseStaff)
app.use('/api/salary', salary)
app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use((req, res) => {
  res.status(404).send({ err: 'No such url' })
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Origin', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept'
  )
  next()
})
connectDB()
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})
console.log(process)

const port = 5000
if (process.env.PORT) {
  app.listen(process.env.PORT, () =>
    console.log(`Server up and running on ${process.env.PORT}`)
  )
} else {
  app.listen(port, () => console.log(`Server up and running on ${port}`))
}
