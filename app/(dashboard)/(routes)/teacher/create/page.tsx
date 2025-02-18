"use client";

import * as z from "zod"
import axios from "axios"
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { title } from "process";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
    title:z.string().min(1, {
        message:"Title is rrequired",
    }),
});

const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            title:""
        },
    });
    const {isSubmitting , isValid} = form.formState;
    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post("/api/courses",values);
            router.push(`/teacher/course/${res.data.id}`)
            toast.success("Course created");


        } catch {
            toast.error("something went wrong")
        }
    }
    return (  
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl bold">
                    Name your course
                </h1>
                <p className="text-sm text-slate-600">
                    What’s the name of your course? Don’t worry—you can always update it later!
                </p>
                <Form {...form}>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-8"
                    >
                        <FormField 
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Course Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'Advance web development'"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    What will you teach in this course ?
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                            <Button variant="ghost" type="button">
                                Cancel
                            </Button>
                            </Link>
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
 
export default CreatePage ;