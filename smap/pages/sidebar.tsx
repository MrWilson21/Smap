'use client'

import * as React from 'react'
import { Star } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar'
import Image from 'next/image'

// Sample data for reviews
const reviews = [
  {
    id: 1,
    author: 'Alice Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    comment: 'Absolutely love this place! The bread is always fresh and delicious.',
  },
  {
    id: 2,
    author: 'Bob Smith',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 4,
    comment: 'Great atmosphere and friendly staff. The coffee is top-notch.',
  },
  {
    id: 3,
    author: 'Carol Davis',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    comment: 'Their artisanal pastries are to die for. A must-visit bakery!',
  },
]

export default function RatingsSidebar() {
  return (
    <SidebarProvider className='w-auto '>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b px-4 pb-2 pt-20">
          <h2 className="text-lg font-semibold">Ratings & Reviews</h2>
        </SidebarHeader>
        <SidebarContent className="px-4 py-2">
          {reviews.map((review) => (
            <Card key={review.id} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.avatar} alt={review.author} />
                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-sm font-medium">{review.author}</CardTitle>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{review.comment}</CardDescription>
              </CardContent>
            </Card>
          ))}
          <Button>Add your review</Button>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <Card className="bg-orange-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-orange-800">Breadsource Café</CardTitle>
                  <CardDescription className="text-orange-700">
                    Artisanal bread & coffee
                  </CardDescription>
                </div>
                <Image src="/breadsourcelogo.png" alt="Breadsource Café logo" width={60} height={60} />
              </div>
              <Button className="mt-4 w-full bg-orange-500 text-white hover:bg-orange-600">
                Visit Us Today!
              </Button>
            </CardContent>
          </Card>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}