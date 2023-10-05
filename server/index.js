require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const {setup_db} = require("./db/connectDB")
const port = process.env.PORT
const {router} = require("./routes/route")
const { error_handler } = require("./middleware/ErrorHandler")
const { invalid_path } = require("./middleware/middleware")

app.use(express.json())
app.use(cors())
app.use(error_handler)
app.use(invalid_path)
app.use("/store", router)

const concat = async () => {
    try {
        await setup_db()
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

concat()