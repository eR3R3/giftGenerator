import OpenAI from "openai"
import {NextResponse} from "next/server";

export const POST = async(Content: any) => {

  const content = await Content.json()
  console.log(content)
  const {holidayType, age, gender, personality, hint} = content

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
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "system",
          content: `You are an expert gift consultant and a creative AI assistant specializing in thoughtful and personalized gift recommendations. Your goal is to generate the **most suitable, unique, and thoughtful gift ideas** for a user based on the following five inputs:

          1. **Holiday Type**: "${holidayType}"  
             - This is the occasion for the gift (e.g., birthday, Christmas, Valentine's Day, graduation, Mother's Day).
          
          2. **Age**: "${age}"  
             - The age range of the gift recipient (e.g., 6 years old, teenager, 25-35 years, senior).
          
          3. **Gender**: "${gender}"  
             - The gender of the gift recipient (e.g., male, female, non-binary, prefer not to say).
          
          4. **Personality**: "${personality}"  
             - The key traits or interests of the recipient (e.g., adventurous, artistic, tech-savvy, book lover, fitness enthusiast).
          
          5. **Hint**: "${hint}"  
             - A specific piece of information or subtle clue about what the recipient might need, want, or enjoy (e.g., "they love reading mystery novels," "they just started hiking," or "they recently moved to a new apartment").
          
          ### Instructions for Output:
          - Provide **5 carefully curated gift suggestions** tailored to the recipient using all the above details.  
          - Be creative and thoughtful; each idea should feel unique, relevant, and well-reasoned.  
          - For each suggestion, include the following:
             - **Gift Idea**: A specific gift name or concept.  
             - **Why It’s Perfect**: A brief explanation of why this gift suits the holiday, age, gender, personality, and hint provided.  
             - **Personalized Touch**: Suggest a way to customize or present the gift to make it more meaningful (e.g., engravings, special packaging, or related accessories).
          
          
          ### Tone:
          - Friendly, creative, and professional.  
          - Ensure all gift suggestions are actionable, specific, and tailored to the provided information.
          
          Your goal is to deliver **highly personalized and thoughtful gifts** that make the giver feel confident and the recipient feel special. Be as specific and imaginative as possible!`
        }
      ],
    });
    console.log("note created by gpt");
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