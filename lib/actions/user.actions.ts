// @ts-ignore

'use server'

import {handleError} from "@/lib/utils"
import {createPromptType, createUserType, updateUserType} from "@/constants/types"
import connectToDB from "@/lib/database/mongoose";
import User from "@/lib/database/models/user.model";
import Prompt from "@/lib/database/models/prompt.model";


export async function connectToDatabase(){
  await connectToDB()
}

export async function createUser(user: createUserType){
  try{
    await connectToDB()
    const newUser: createUserType = await User.create(user)
    console.log("user created successfully")
    return(newUser)
  }catch(err){
    handleError(err)
  }
}

export async function findUser(clerkId?: string){
    await connectToDB()
    const user = await User.findOne({clerkId})
    user && console.log("find user successfully")
    return JSON.parse(JSON.stringify(user))
}

export async function updateUser(clerkId: string, user: updateUserType){
  try{
    await connectToDB()
    const updatedUser = await User.findByIdAndUpdate({clerkId}, user, {new: true})
    // @ts-ignore
    updatedUser && console.log("update updated failed")
    if(!updatedUser){
      throw new Error("User not found")
    }
    return JSON.parse(JSON.stringify(updatedUser));
  }catch(err){
    handleError(err)
  }
}

export async function deleteUser(clerkId: string){
  try{
    await connectToDB()
    const user = await User.findOne({clerkId})
    console.log("user deleted processing")
    if(!user) throw new Error("user not found")
    const deletedUser = await User.findOneAndDelete({clerkId})
    return JSON.parse(JSON.stringify(deletedUser))
  }catch(err){
    handleError(err)
  }
}

export async function createPrompt(clerkId: string, prompt: createPromptType){
  try{
    await connectToDB()
    const user = await User.findOne({clerkId})
    Object.assign(prompt, {creatorId: user._id})
    Object.assign(prompt, {clerkId: clerkId})
    Object.assign(prompt, {creator: user.username})
    console.log(prompt)
    const createdPrompt = await Prompt.create(prompt)
    if(!createdPrompt) throw new Error("create not successfully")
    else console.log("created successfully")
  }catch(err){
    handleError(err)
  }
}

export async function findPrompt(objectId: any){
  try{
    await connectToDB()
    const foundPrompt = await Prompt.findOne({objectId})
    if(!foundPrompt) throw new Error("delete failed or no prompt found")
    return JSON.parse(JSON.stringify(foundPrompt))
  }catch(err){
    handleError(err)
  }
}

export async function deletePrompt(ObjectId: any){
  try{
    await connectToDB()
    console.log(ObjectId)
    const deletedPrompt = await Prompt.findOneAndDelete({_id:ObjectId})
    console.log("deleted successfully")
    if(!deletedPrompt) throw new Error("delete failed")
    return JSON.parse(JSON.stringify(deletedPrompt))
  }catch(err){
    handleError(err)
  }
}


export async function findAllPrompts(clerkId: string){
    await connectToDB()
    console.log(clerkId)
    const user = await User.findOne({clerkId})
    const creatorId = user._id
    console.log(creatorId)
    if(!creatorId) throw new Error("creatorId not found")
    let allPrompts = (await Prompt.find({creatorId}))
    if(allPrompts) console.log("find allPrompts")
    return JSON.parse(JSON.stringify(allPrompts))
}

export async function findAllPromptsBig(){
  await connectToDB()
  const allPrompts = await Prompt.find({isPublic: true})
  return JSON.parse(JSON.stringify(allPrompts))
}

export async function addScore(promptObjectId: any, score: number){
  await connectToDB()
  console.log(promptObjectId)
  console.log("added score of the prompt", score)
  const ratedPrompt = await Prompt.findOneAndUpdate({_id: promptObjectId},  { $push: { ratings: score } } , {new: true})
  return JSON.parse(JSON.stringify(ratedPrompt))
}

export async function calculateAverageRating(objectId: any) {
  try {
    await connectToDB();
    const prompt = await Prompt.findOne({ _id: objectId });
    if (!prompt) throw new Error("No user found or calculation failed");

    const ratings = prompt.ratings;
    if (ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce((total: number, rating: number) => total + rating, 0);
    return sum / ratings.length
  } catch (err) {
    handleError(err);
  }
}