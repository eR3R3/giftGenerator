'use client'

import React, {useState} from 'react';
import SideBar from "@/components/SideBar";
import { useForm, FormProvider } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import HeroButton from "@/components/HeroButton";
import {Input} from "@/components/ui/input";
import CreateButton from "@/components/CreateButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import Form from "next/form";
import {useRouter} from "next/navigation";
import {createPrompt} from "@/lib/actions/user.actions";
import { useUser } from '@clerk/clerk-react';
import {createPromptType} from "@/constants/types";



const Create = () => {
  return (
      <div>
        <SideBar
          children={mainContent()}/>
      </div>
  );
};



const mainContent = () => {

  const { user } = useUser();

  const router = useRouter()
  const [hint, setHint] = useState('')
  const [age, setAge] = useState(18)
  const [gender, setGender] = useState('')
  const [personality, setPersonality] = useState('')
  const [holidayType, setHolidayType] = useState('')
  const [ans, setAns] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [generating, setGenerating] = useState(false)

  const defaultValues = {
    gift: "",
    holidayType: "",
    age: 18,
    gender:"",
    personality: "",
    hint: "",
    ans: "",
  };

  const clerkId = user?.id as string

  const formSchema = z.object({
    gift: z.string().min(1, "This field is required").max(100, "Maximum length is 100"),
    age: z.number().min(0,  "Number must be at least 1" ).max(150, "Number must be at most 2" ),
    gender: z.string().min(1, "This field is required").max(100, "Maximum length is 100"),
    personality: z.string().min(1, "This field is required").max(100, "Maximum length is 100"),
    hint: z.string().min(10, "This field is required").max(100, "Maximum length is 200"),
    suggestion:z.string().min(5, "minimum is 5 words").max(1000, "maximum is 1000 words")
  });

  const form = useForm({ defaultValues: defaultValues, resolver: zodResolver(formSchema)});

  const onSubmit = (data: createPromptType) => {
    console.log("submit button triggered")
    console.log(data);
    createPrompt(clerkId, data)
    router.push("/profile")
  };

  return (
      <FormProvider {...form}>
        <form onSubmit={onSubmit} className="p-6 space-y-8 bg-gray-100 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-900">Gift Form</h1>
          <p className="text-center text-gray-600">
            Fill out the form below to customize your gift details. Let your creativity shine!
          </p>

          {/* Gift and Holiday Type */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Age */}
            <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-lg font-bold text-gray-800">Age</FormLabel>
                      <FormControl>
                        <Input
                            type="number"
                            placeholder="Enter the age"
                            value={field.value}
                            onChange={(e)=>{
                              // @ts-ignore
                              setAge(e.target.value)
                              field.onChange(Number(e.target.value))
                            }}
                            className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                        />
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        Specify the recipient's age.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                )}
            />

            {/* Gender */}
            <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-lg font-bold text-gray-800">Gender</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value)=>{
                          setGender(value)
                          field.onChange(value)
                        }}>
                          <SelectTrigger className="border-2 border-gray-700 rounded-lg shadow-md">
                            <SelectValue placeholder="Select a holiday" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        Select the holiday this gift is for.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                )}
            />

            {/* Holiday Type (Shadcn Select) */}
            <FormField
                control={form.control}
                name="holidayType"
                render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-lg font-bold text-gray-800">Holiday Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="border-2 border-gray-700 rounded-lg shadow-md">
                            <SelectValue placeholder="Select a holiday" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="christmas">Christmas</SelectItem>
                            <SelectItem value="thanksgiving">Thanksgiving</SelectItem>
                            <SelectItem value="newYear">New Year</SelectItem>
                            <SelectItem value="valentines">Valentine's Day</SelectItem>
                            <SelectItem value="easter">Easter</SelectItem>
                            <SelectItem value="halloween">Halloween</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        Select the holiday this gift is for.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                )}
            />
          </div>


          <div className="flex flex-col md:flex-row gap-6">
            {/* Personality */}
            <FormField
                control={form.control}
                name="personality"
                render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-lg font-bold text-gray-800">Personality</FormLabel>
                      <FormControl>
                        <Textarea
                            placeholder="Describe their personality"
                            value={field.value}
                            onChange={(e)=>{
                              setPersonality(e.target.value)
                              field.onChange(e.target.value)
                            }}
                            className="p-4 h-28 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                        />
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        Mention traits like cheerful, introverted, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="hint"
                render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-lg font-bold text-gray-800">Other things to mention</FormLabel>
                      <FormControl>
                        <Textarea
                            placeholder="Provide a hint for the gift"
                            value={field.value}
                            onChange={(e)=>{
                              setHint(e.target.value)
                              field.onChange(e.target.value)
                            }}
                            className="h-28 p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all resize-none"
                        />
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        Give a subtle hint to make it fun.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                )}
            />
            <div className="pt-11 flex flex-col">
              <CreateButton
              name={generating? "GENERATING": "GENERATE"}
              type="button"
              onClick={async () => {
                setGenerating(true)
                const content = {holidayType, age, gender, personality, hint}
                const response = await fetch("/api/gpt", {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(content)
                })
                console.log("generate button triggered")
                setAns(await response.json())
                setGenerating(false)
              }}/>
              <p className="text-gray-400 font-medium pt-3 text-[14px]">AI can give you good advices!</p>
            </div>
          </div>



          <div className="flex flex-col md:flex-row gap-8">
            {/* Answer */}
            <FormField
                control={form.control}
                name="ans"
                render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-lg font-bold text-gray-800">Suggestion</FormLabel>
                      <FormControl>
                        <Textarea
                            placeholder="AI generated advices to the hint"
                            value={ans}
                            onChange={(e)=>{
                              setAns(e.target.value)
                            }}
                            className="h-48 p-4 border-2 border-gray-700  shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all resize-none"
                        />
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        AI generated answer clearly for reference.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                )}
            />
          </div>

          {/* Submit  */}
          <div className="flex justify-between gap-8">
            <FormField
                control={form.control}
                name="gift"
                render={({ field }) => (
                    <FormItem className="w-full ">
                      <FormLabel className="text-lg font-bold text-gray-800">Final Gift Choice</FormLabel>
                      <FormControl>
                        <Input
                            type="string"
                            placeholder="Enter the final gift choice"
                            {...field}
                            className="h-12 p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                        />
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        Specify the Final Gift Choice.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                )}
            />
          </div>
          <div className="text-center justify-center flex">
            <CreateButton
                name={submitting ? 'SUBMITTING' : 'SUBMIT'}
                type="submit"/>
          </div>
        </form>
      </FormProvider>
  );
};





export default Create;
