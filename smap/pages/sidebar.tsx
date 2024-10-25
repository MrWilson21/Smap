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
import { Typography } from '@mui/material'
import { IMarker } from './mapComponent'

type RatingsSidebarProps = {
  marker: IMarker
}

export default function RatingsSidebar({marker} : RatingsSidebarProps) {
  return (
    <SidebarProvider className='w-auto '>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b px-4 pb-2 pt-20">
          <h2 className="text-lg font-semibold">Ratings & Reviews</h2>
        </SidebarHeader>
        <SidebarContent className="px-4 py-2">
          {marker.info.reviews.map((review) => (
            <Card key={review.message} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{review.userName[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-sm font-medium">{review.userName}</CardTitle>
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
                <CardDescription>{review.message}</CardDescription>
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
                    Artisanal bread & coffee<br/>
                    <Typography variant="caption">Sponsored</Typography>
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