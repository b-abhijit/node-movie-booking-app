const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routes/user-routes')
const adminRouter = require('./routes/admin-routes')
const movieRouter = require('./routes/movie-routes')
const bookingRouter = require('./routes/booking-routes')
const port = 5000

dotenv.config()
const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// middleware section
app.use(express.json())
app.use("/users", userRouter)
app.use("/admin", adminRouter)
app.use("/movies", movieRouter)
app.use("/booking", bookingRouter)

// app.use('/', (req, res, next) => {
//     res.send('<h1>Abhijit Baruah</h1>');
// })

mongoose.connect(
    "mongodb+srv://abhijitb:KBhX4ZrjpKiLvsUb@app.f0c9ve9.mongodb.net/"
    ).then(() => app.listen(port, () =>
        console.log('listening to port ' + port)
    )
    ).catch(e => console.log(e))

// app.listen(port, () => {
//     console.log('listening to port ' + port)
// })