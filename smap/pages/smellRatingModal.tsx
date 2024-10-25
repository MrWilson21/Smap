"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { Star, Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type SmellRatingFormData = {
  message: string
  rating: number
  image: string
}

type SmellRatingModalProps = {
  open: boolean
  onOpenChange: () => void
  onSubmit: (data: SmellRatingFormData) => void
}

export default function SmellRatingModal(props: SmellRatingModalProps) {
  const { register, handleSubmit, control, setValue, watch } = useForm<SmellRatingFormData>()

  const onSubmit = (data: SmellRatingFormData) => {
    console.log(data)
    props.onSubmit(data)
  }

  const watchImage = watch("image")

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Rate a Smell</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate a Smell</DialogTitle>
          <DialogDescription>
            Provide details about the smell you have encountered.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-muted-foreground">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input id="title" {...register("title", { required: true })} placeholder="Enter a title" />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea id="message" {...register("message")} placeholder="Describe the smell" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <Controller
              name="rating"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      className={`text-2xl ${
                        star <= field.value ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      <Star className="w-6 h-6" />
                      <span className="sr-only">{star} stars</span>
                    </button>
                  ))}
                </div>
              )}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Image
            </label>
            <div className="flex items-center space-x-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                {...register("image")}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setValue("image", reader.result as string)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image")?.click()}
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Picture
              </Button>
              {watchImage && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setValue("image", "")}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>
            {watchImage && (
              <div className="mt-2">
                <img src={watchImage} alt="Captured smell location" className="max-w-full h-auto rounded-md" />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={props.onOpenChange}>
              Cancel
            </Button>
            <Button type="submit">Submit Rating</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}