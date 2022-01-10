import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
} );

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);
db.on("error", handleError);
// once: 오로지 한번만 실행
db.once("open", handleOpen);