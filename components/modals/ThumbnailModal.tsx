"use client"

import { useEdgeStore } from "@/lib/edgestore";
import { useThumbnail } from "../hooks/use-thumbnail";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "@/components/ImageDropzone";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import OpenAI from "openai";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

const FormSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt something or use Drag and Drop method..." }),
});

type InputType = z.infer<typeof FormSchema>;

export const ThumbnailModal = () => {
  const thumbnail = useThumbnail();
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File | undefined>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
 
  const update = useMutation(api.documents.updateNotes);
  const params = useParams();

  const form = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${data.prompt}. Using the prompt given, generate a thumbnail description for it.summarize using a single descriptive sentence.`,
          },
        ],
      });
      const responseMessage = response.choices[0].message.content ?? "";
      const imageFetchResponse = await fetch(`https://api.openai.com/v1/images/generations`, {
        method: "POST",
        body: JSON.stringify({
          prompt: responseMessage + " illustration, anime, photographic, realistic",
          n: 1,
          size: "256x256",
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
        },
      });
      const imageResponse = await imageFetchResponse.json();
      console.log("imageResponse", imageResponse);
      const imageUrl = imageResponse.data[0].url;
      console.log(imageUrl);
      onChange(imageUrl)
      
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const response = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: thumbnail.url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        thumbnail: response.url,
      });
      onClose();
    }
  };

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    thumbnail.onClose();
  };

  return (
    <Dialog open={thumbnail.isOpen} onOpenChange={thumbnail.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Thumbnail</h2>
        </DialogHeader>
        <div>
          <SingleImageDropzone
            onChange={onChange}
            value={file}
            disabled={isSubmitting}
            className="w-full outline-none"
          />
          <p className="text-center pt-2">Or</p>
            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Generate with AI</FormLabel>
                      <Input 
                        type="text" 
                        placeholder="Enter your prompt here" {...field}
                        disabled={isSubmitting}
                        />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
