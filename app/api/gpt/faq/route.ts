import OpenAI from "openai"
import {NextResponse} from "next/server";

export const POST = async(Question: any) => {

  Question = await Question.json()
  console.log(Question)
  const {question} = Question

  try {
    const openai = new OpenAI(
        {
          apiKey: process.env.QWEN_API_KEY,
          baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
        }
    );
    const completion = await openai.chat.completions.create({
      model: "qwen-plus",
      messages: [
        { role: "system", content: "Now you are a helpful assistant to help us answer all the problems the user asked, no matter which kind of problem it is!" +
              "Here are our basic information:" +
              "1. the app is created by Lucas Tao(me)" +
              "2. if users have some problems using the app and want to give suggestions, please contact er1r1@qq.com or lucastao637@gmail.com." },
        {
          role: "user",
          content: `${question}`
        }
      ],
    });
    console.log("question answered by gpt");
    console.log(completion.choices[0].message.content)
    return NextResponse.json(completion.choices[0].message.content)
  } catch (error) {
    console.log(`错误信息：${error}`);
    console.log("请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code");
    return NextResponse.json(
        { error: "请求处理失败，请稍后重试。" },
        { status: 500 }
    )
  }
}