import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    id: {
      type: String,
    },
    text: {
      type: String,
    },
    start:{
      type:String, 
      required: true,
    value:{
      type: String,
      required: true,
    }},

    end: {
      type:String, 
      required: true,
      value:{
      type: String,
      required: true,
    }},
    backColor: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema, "events");
