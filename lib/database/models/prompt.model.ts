import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
  creatorId: {type: Schema.Types.ObjectId, ref: 'User', unique: false},
  creator: {type: String, required: true, unique: false},
  clerkId: {type: String, required: true, unique: false},
  gift: {type: String, required: true, unique: false},
  holidayType: {type: String, required: true, unique: false},
  age: {type: Number, required: true, unique: false},
  personality: {type: String, required: true, unique: false},
  hint:{type: String, required: true, unique: false},
  ans:{type: String, required: true, unique: false},
  ratings: {type: [Number], required: true, unique: false, default: []},
  isPublic: {type: Boolean, default: false, unique: false}
})

delete models.Prompt;
// 重新定义模型
const Prompt = models.Prompt || model("Prompt", UserSchema);
export default Prompt















