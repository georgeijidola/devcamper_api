const mongoose = require("mongoose")
const connectionUrl = process.env.DB_URL

module.exports = async () => {
  const connect = await mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  console.log(
    `MongoDB connected: ${connect.connection.host}`.cyan.underline.bold
  )
}
