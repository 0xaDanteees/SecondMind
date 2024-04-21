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
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `${data.prompt}`,
            n: 1,
            response_format: "b64_json",
            size: "1024x1024",
        });

        const blob = await (await fetch(`data:image/jpeg;base64,${response.data[0].b64_json}`)).blob();
        const file = new File([blob], 'thumbnail.png', { type: 'image/png' });
        onChange(file);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setIsSubmitting(false);
    }
};
  
  const onChange = async (file?: File) => {
    if (file) {
        console.log(file)
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
