import mongoose from 'mongoose'
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      completed: {
        type: Boolean,
        default: false
      },
      imgUrl: {
        type: String,
      }, 
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
  }, { timestamps: true})


  export default mongoose.model("Task", taskSchema)