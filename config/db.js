const mongoose = require("mongoose")

module.exports = async () => {
  const connect = await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  console.log(
    ` MongoDB connected: ${connect.connection.host} `.cyan.underline.bold
  )
}
