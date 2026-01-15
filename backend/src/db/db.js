const mongoose = require("mongoose");

const connectToDB=async()=>{ try{await mongoose.connect(process.env.MONGODB_URL)
    console.log("database connected successful")
}catch(err){ console.log("DB connection failed")

}
   
};

module.exports = connectToDB;