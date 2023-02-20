import mongoose from 'mongoose'
const Schema = mongoose.Schema

const tasksSchema = new Schema(
  {
      description: {
        type: String,
        max: 500,
        required: true
      },
      icon: {
        type: String,
      }, 
      userId: {
        type: String,
        required: true,
      },
      img: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
    },

      { timestamps: true }
      
  )


  export default mongoose.model("Tasks", tasksSchema)