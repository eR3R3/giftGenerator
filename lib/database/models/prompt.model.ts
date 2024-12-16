import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
  creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  creator: {type: String, required: true},
  clerkId: {type: String, required: true},
  gift: {type: String, required: true},
  holidayType: {type: String, required: true},
  age: {type: Number, required: true},
  personality: {type: String, required: true},
  hint:{type: String, required: true}
})

const Prompt = models.Prompt || model("Prompt", UserSchema)
export default Prompt