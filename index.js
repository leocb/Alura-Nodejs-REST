app = require('./config/custom-express')()

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})