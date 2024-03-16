const mongoose = require('mongoose')

const connect =async()=>{
    try {
        const cnn = await mongoose.connect(process.env.URI)
        console.log(`database connected ${cnn.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connect