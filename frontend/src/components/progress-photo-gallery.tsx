"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

// Sample progress photos with dates and measurements
const sampleProgressPhotos = [
  {
    id: 1,
    date: "2023-01-15",
    weight: 85,
    bodyFat: 28,
    muscleMass: 35,
    imageUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 2,
    date: "2023-02-15",
    weight: 82,
    bodyFat: 26,
    muscleMass: 36,
    imageUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 3,
    date: "2023-03-15",
    weight: 80,
    bodyFat: 24,
    muscleMass: 37,
    imageUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 4,
    date: "2023-04-15",
    weight: 77,
    bodyFat: 22,
    muscleMass: 38,
    imageUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 5,
    date: "2023-05-15",
    weight: 75,
    bodyFat: 20,
    muscleMass: 40,
    imageUrl: "/placeholder.svg?height=300&width=200",
  },
]

export default function ProgressPhotoGallery() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [comparisonPhotoIndex, setComparisonPhotoIndex] = useState(sampleProgressPhotos.length - 1)

  const currentPhoto = sampleProgressPhotos[currentPhotoIndex]
  const comparisonPhoto = sampleProgressPhotos[comparisonPhotoIndex]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Progress Photo Gallery</CardTitle>
        <CardDescription>Track your transformation visually</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single View</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-4">
            <div className="flex justify-center py-4">
              <div className="relative">
                <img
                  src={currentPhoto.imageUrl || "/placeholder.svg"}
                  alt={`Progress photo from ${formatDate(currentPhoto.date)}`}
                  className="rounded-lg border"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
                  <div className="text-sm font-medium">{formatDate(currentPhoto.date)}</div>
                  <div className="text-xs">
                    Weight: {currentPhoto.weight}kg | BF: {currentPhoto.bodyFat}% | Muscle: {currentPhoto.muscleMass}%
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPhotoIndex(Math.max(0, currentPhotoIndex - 1))}
                disabled={currentPhotoIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center space-x-1 text-sm">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(currentPhoto.date)}</span>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPhotoIndex(Math.min(sampleProgressPhotos.length - 1, currentPhotoIndex + 1))}
                disabled={currentPhotoIndex === sampleProgressPhotos.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={sampleProgressPhotos[0].imageUrl || "/placeholder.svg"}
                    alt={`Starting photo from ${formatDate(sampleProgressPhotos[0].date)}`}
                    className="rounded-lg border"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
                    <div className="text-xs">Start: {formatDate(sampleProgressPhotos[0].date)}</div>
                    <div className="text-xs">Weight: {sampleProgressPhotos[0].weight}kg</div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-center">Starting Point</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={comparisonPhoto.imageUrl || "/placeholder.svg"}
                    alt={`Current photo from ${formatDate(comparisonPhoto.date)}`}
                    className="rounded-lg border"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
                    <div className="text-xs">Current: {formatDate(comparisonPhoto.date)}</div>
                    <div className="text-xs">Weight: {comparisonPhoto.weight}kg</div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-center">Current</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Weight Change:</span>
                <span className="font-medium text-green-600">
                  -{(sampleProgressPhotos[0].weight - comparisonPhoto.weight).toFixed(1)}kg
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Body Fat Change:</span>
                <span className="font-medium text-green-600">
                  -{(sampleProgressPhotos[0].bodyFat - comparisonPhoto.bodyFat).toFixed(1)}%
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Muscle Mass Change:</span>
                <span className="font-medium text-green-600">
                  +{(comparisonPhoto.muscleMass - sampleProgressPhotos[0].muscleMass).toFixed(1)}%
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Time Period:</span>
                <span className="font-medium">
                  {Math.round(
                    (new Date(comparisonPhoto.date).getTime() - new Date(sampleProgressPhotos[0].date).getTime()) /
                      (1000 * 60 * 60 * 24 * 7),
                  )}{" "}
                  weeks
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setComparisonPhotoIndex(Math.max(1, comparisonPhotoIndex - 1))}
                disabled={comparisonPhotoIndex <= 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="mx-4 text-sm flex items-center">
                Photo {comparisonPhotoIndex} of {sampleProgressPhotos.length - 1}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setComparisonPhotoIndex(Math.min(sampleProgressPhotos.length - 1, comparisonPhotoIndex + 1))
                }
                disabled={comparisonPhotoIndex === sampleProgressPhotos.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Calendar className="mr-2 h-4 w-4" />
          Add New Progress Photo
        </Button>
      </CardFooter>
    </Card>
  )
}
