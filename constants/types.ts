export interface createUserType {
  clerkId: string,
  email: string,
  username: string
  photo: string
}

export type updateUserType = {
  username: string
  photo: string
}

export type createPromptType = {
  gift: string,
  holidayType: string,
  age: number,
  personality: string,
  hint: string
  ans: string
}




