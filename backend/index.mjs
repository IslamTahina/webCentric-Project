import express from "express"
import routes from './routes/student.mjs'
import cors from 'cors'
const app = express()
app.use(express.json())

app.use(cors())
app.get('/students', routes.getAllStudents)
app.get('/student/:id', routes.getStudent)
app.delete('/student/:id', routes.deleteStudent)
app.patch('/student/:id', routes.updateStudent)
app.post('/student', routes.addStudent)


app.listen(5454)
