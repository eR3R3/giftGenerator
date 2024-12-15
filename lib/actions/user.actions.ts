import {handleError} from "@/lib/utils"
import {createPromptType, createUserType, updateUserType} from "@/constants/types"
import connectToDB from "@/lib/database/mongoose";
import User from "@/lib/database/models/user";
import Prompt from "@/lib/database/models/prompt";


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

export async function findUser(clerkId: string){
  try{
    await connectToDB()
    const user = await User.findOne({clerkId})
    user && console.log("find user successfully")
    if(!user){
      throw new Error("User not found")
    }
    return user
  }catch(err){
    handleError(err)
  }
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
    return updatedUser
  }catch(err){
    handleError(err)
  }
}

export async function deleteUser(clerkId: string){
  try{
    await connectToDB()
    const user = await User.findOne({clerkId})
    if(!user) throw new Error("user not found")
    const deletedUser = await User.findOneAndDelete({clerkId})
    return deletedUser
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

export async function deletePrompt(prompt: any){
  try{
    await connectToDB()
    const ObjectId = prompt.ObjectId
    const deletedPrompt = await Prompt.findOneAndDelete({ObjectId})
    if(!deletedPrompt) throw new Error("delete failed or no prompt found")
    return deletedPrompt
  }catch(err){
    handleError(err)
  }
}

export async function findPrompt(clerkId: string, prompt: createPromptType){
  try{
    await connectToDB()
    Object.assign(prompt,{clerkId})
    const foundPrompt = Prompt.findOne({prompt})
    if(!foundPrompt) throw new Error("prompt not found")
    return foundPrompt
  }catch(err){
    handleError(err)
  }
}

