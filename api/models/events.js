import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const eventSchema = new Schema({
  
  text: {
    type: Array,
    default: [],
  },
  start: {
    type: Array,
    default: [],
  },
  end: {
    type: Array,
    default: [],
  },
  backColor: {
    type: String,
    default: "white",
  },
  user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
}, { timestamps: true});


export default mongoose.model("Event", eventSchema, "events");
