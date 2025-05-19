import mongoose from "mongoose";

const drawModel = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  file: {
    type: String,
    require:true,
    
  },
});

export default mongoose.model("Draw", drawModel);
