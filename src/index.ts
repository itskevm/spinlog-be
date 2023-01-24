import bodyParser, { urlencoded } from "body-parser"
import express from "express"
import pg from "pg"

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const pool = new pg.Pool()

const app = express()
const port = process.env.PORT || 3333

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.raw({ type: "application/vnd.custom-type" }))
app.use(express.text({ type: "text/html" }))

app.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT NOW()")
  res.send(`Hello, World! The time from the DB is ${rows[0].now}`)
})

app.get("/666", async (req, res) => {
  res.send(`Look this is a link for BRENDA who needs to bring 2 people to the wedding`)
})

app.get("/add-kevin", async (req, res) => {
  const { rows } = await pool.query("INSERT INTO driver(driver_name) VALUES (Kevin)")
  res.send(`we need to find out how many rows were made`)
})

app.get("/search", async (req, res) => {
  res.send(`DIEGO: website.com/888`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
