"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowLeftRight, Save, Camera } from "lucide-react"

// Body type definitions
const bodyTypes = [
  { id: "ectomorph", name: "Ectomorph", description: "Lean and long, difficulty gaining weight" },
  { id: "mesomorph", name: "Mesomorph", description: "Athletic and muscular, gains/loses weight easily" },
  { id: "endomorph", name: "Endomorph", description: "Soft and round, gains weight easily, difficulty losing weight" },
]

export default function FitnessAvatarComparison() {
  // Current physical attributes
  const [currentAttributes, setCurrentAttributes] = useState({
    height: 175, // cm
    weight: 75, // kg
    bodyType: "mesomorph",
    bodyFat: 20, // percentage
    muscleMass: 40, // percentage
  })

  // Previous physical attributes (for comparison)
  const [previousAttributes, setPreviousAttributes] = useState({
    height: 175, // cm
    weight: 85, // kg
    bodyType: "endomorph",
    bodyFat: 28, // percentage
    muscleMass: 35, // percentage
  })

  // State to track if we're viewing comparison
  const [showComparison, setShowComparison] = useState(false)

  // Function to save current attributes as a milestone
  const saveCurrentAsMilestone = () => {
    setPreviousAttributes({ ...currentAttributes })
  }

  // Function to generate avatar SVG based on physical attributes
  const generateAvatarSvg = (attributes) => {
    const { height, weight, bodyType, bodyFat, muscleMass } = attributes

    // Calculate body width based on weight and body type
    let bodyWidth = 50
    if (bodyType === "ectomorph") {
      bodyWidth = 40 + (weight / 100) * 10
    } else if (bodyType === "mesomorph") {
      bodyWidth = 45 + (weight / 100) * 15
    } else if (bodyType === "endomorph") {
      bodyWidth = 50 + (weight / 100) * 20
    }

    // Calculate muscle definition based on muscle mass and body fat
    const muscleDefinition = (muscleMass / 100) * (1 - bodyFat / 100) * 100

    // Calculate body height based on height attribute
    const bodyHeight = (height / 200) * 120

    return {
      bodyWidth,
      bodyHeight,
      muscleDefinition,
      bodyFat,
    }
  }

  // Generate avatar data for current and previous attributes
  const currentAvatarData = generateAvatarSvg(currentAttributes)
  const previousAvatarData = generateAvatarSvg(previousAttributes)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Physique</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Avatar</CardTitle>
                <CardDescription>Based on your current physical attributes</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative w-64 h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg width="160" height="240" viewBox="0 0 160 240" className="avatar-svg">
                    {/* Head */}
                    <circle cx="80" cy="40" r="30" fill="#FFD3B5" />

                    {/* Body - width varies based on weight and body type */}
                    <rect
                      x={80 - currentAvatarData.bodyWidth / 2}
                      y="70"
                      width={currentAvatarData.bodyWidth}
                      height={currentAvatarData.bodyHeight}
                      rx="10"
                      fill="#FFD3B5"
                    />

                    {/* Arms - thickness varies based on muscle mass */}
                    <rect
                      x={80 - currentAvatarData.bodyWidth / 2 - 15}
                      y="80"
                      width="15"
                      height={currentAvatarData.bodyHeight - 30}
                      rx="5"
                      fill="#FFD3B5"
                    />
                    <rect
                      x={80 + currentAvatarData.bodyWidth / 2}
                      y="80"
                      width="15"
                      height={currentAvatarData.bodyHeight - 30}
                      rx="5"
                      fill="#FFD3B5"
                    />

                    {/* Legs */}
                    <rect
                      x={80 - currentAvatarData.bodyWidth / 4 - 10}
                      y={70 + currentAvatarData.bodyHeight}
                      width="20"
                      height="60"
                      rx="5"
                      fill="#FFD3B5"
                    />
                    <rect
                      x={80 + currentAvatarData.bodyWidth / 4 - 10}
                      y={70 + currentAvatarData.bodyHeight}
                      width="20"
                      height="60"
                      rx="5"
                      fill="#FFD3B5"
                    />

                    {/* Muscle definition lines - more visible with higher muscle definition */}
                    {currentAvatarData.muscleDefinition > 30 && (
                      <>
                        {/* Abs */}
                        <line
                          x1={80}
                          y1={90}
                          x2={80}
                          y2={70 + currentAvatarData.bodyHeight - 20}
                          stroke="#E0B0A0"
                          strokeWidth={currentAvatarData.muscleDefinition / 20}
                        />
                        {/* Chest */}
                        <path
                          d={`M${80 - 15},100 Q${80},110 ${80 + 15},100`}
                          stroke="#E0B0A0"
                          strokeWidth={currentAvatarData.muscleDefinition / 20}
                          fill="none"
                        />
                        {/* Arms */}
                        <line
                          x1={80 - currentAvatarData.bodyWidth / 2 - 7.5}
                          y1={100}
                          x2={80 - currentAvatarData.bodyWidth / 2 - 7.5}
                          y2={130}
                          stroke="#E0B0A0"
                          strokeWidth={currentAvatarData.muscleDefinition / 20}
                        />
                        <line
                          x1={80 + currentAvatarData.bodyWidth / 2 + 7.5}
                          y1={100}
                          x2={80 + currentAvatarData.bodyWidth / 2 + 7.5}
                          y2={130}
                          stroke="#E0B0A0"
                          strokeWidth={currentAvatarData.muscleDefinition / 20}
                        />
                      </>
                    )}
                  </svg>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowComparison(!showComparison)}>
                  <ArrowLeftRight className="mr-2 h-4 w-4" />
                  {showComparison ? "Hide" : "Show"} Comparison
                </Button>
                <Button onClick={saveCurrentAsMilestone}>
                  <Save className="mr-2 h-4 w-4" />
                  Save as Milestone
                </Button>
              </CardFooter>
            </Card>

            {showComparison && (
              <Card>
                <CardHeader>
                  <CardTitle>Previous Avatar</CardTitle>
                  <CardDescription>Compare with your previous milestone</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="relative w-64 h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg width="160" height="240" viewBox="0 0 160 240" className="avatar-svg">
                      {/* Head */}
                      <circle cx="80" cy="40" r="30" fill="#FFD3B5" />

                      {/* Body - width varies based on weight and body type */}
                      <rect
                        x={80 - previousAvatarData.bodyWidth / 2}
                        y="70"
                        width={previousAvatarData.bodyWidth}
                        height={previousAvatarData.bodyHeight}
                        rx="10"
                        fill="#FFD3B5"
                      />

                      {/* Arms - thickness varies based on muscle mass */}
                      <rect
                        x={80 - previousAvatarData.bodyWidth / 2 - 15}
                        y="80"
                        width="15"
                        height={previousAvatarData.bodyHeight - 30}
                        rx="5"
                        fill="#FFD3B5"
                      />
                      <rect
                        x={80 + previousAvatarData.bodyWidth / 2}
                        y="80"
                        width="15"
                        height={previousAvatarData.bodyHeight - 30}
                        rx="5"
                        fill="#FFD3B5"
                      />

                      {/* Legs */}
                      <rect
                        x={80 - previousAvatarData.bodyWidth / 4 - 10}
                        y={70 + previousAvatarData.bodyHeight}
                        width="20"
                        height="60"
                        rx="5"
                        fill="#FFD3B5"
                      />
                      <rect
                        x={80 + previousAvatarData.bodyWidth / 4 - 10}
                        y={70 + previousAvatarData.bodyHeight}
                        width="20"
                        height="60"
                        rx="5"
                        fill="#FFD3B5"
                      />

                      {/* Muscle definition lines - more visible with higher muscle definition */}
                      {previousAvatarData.muscleDefinition > 30 && (
                        <>
                          {/* Abs */}
                          <line
                            x1={80}
                            y1={90}
                            x2={80}
                            y2={70 + previousAvatarData.bodyHeight - 20}
                            stroke="#E0B0A0"
                            strokeWidth={previousAvatarData.muscleDefinition / 20}
                          />
                          {/* Chest */}
                          <path
                            d={`M${80 - 15},100 Q${80},110 ${80 + 15},100`}
                            stroke="#E0B0A0"
                            strokeWidth={previousAvatarData.muscleDefinition / 20}
                            fill="none"
                          />
                          {/* Arms */}
                          <line
                            x1={80 - previousAvatarData.bodyWidth / 2 - 7.5}
                            y1={100}
                            x2={80 - previousAvatarData.bodyWidth / 2 - 7.5}
                            y2={130}
                            stroke="#E0B0A0"
                            strokeWidth={previousAvatarData.muscleDefinition / 20}
                          />
                          <line
                            x1={80 + previousAvatarData.bodyWidth / 2 + 7.5}
                            y1={100}
                            x2={80 + previousAvatarData.bodyWidth / 2 + 7.5}
                            y2={130}
                            stroke="#E0B0A0"
                            strokeWidth={previousAvatarData.muscleDefinition / 20}
                          />
                        </>
                      )}
                    </svg>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Previous: {previousAttributes.weight}kg</span>
                      <span>Current: {currentAttributes.weight}kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Body Fat: {previousAttributes.bodyFat}%</span>
                      <span>Body Fat: {currentAttributes.bodyFat}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Muscle: {previousAttributes.muscleMass}%</span>
                      <span>Muscle: {currentAttributes.muscleMass}%</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>

          {showComparison && (
            <Card>
              <CardHeader>
                <CardTitle>Progress Summary</CardTitle>
                <CardDescription>Your fitness journey at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Weight Change</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            currentAttributes.weight < previousAttributes.weight ? "bg-green-500" : "bg-yellow-500"
                          }`}
                          style={{
                            width: `${Math.min(100, Math.abs(((previousAttributes.weight - currentAttributes.weight) / previousAttributes.weight) * 100))}%`,
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {(previousAttributes.weight - currentAttributes.weight).toFixed(1)}kg
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Body Fat Reduction</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            currentAttributes.bodyFat < previousAttributes.bodyFat ? "bg-green-500" : "bg-yellow-500"
                          }`}
                          style={{
                            width: `${Math.min(100, Math.abs(((previousAttributes.bodyFat - currentAttributes.bodyFat) / previousAttributes.bodyFat) * 100))}%`,
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {(previousAttributes.bodyFat - currentAttributes.bodyFat).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Muscle Mass Gain</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            currentAttributes.muscleMass > previousAttributes.muscleMass
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                          style={{
                            width: `${Math.min(100, Math.abs(((currentAttributes.muscleMass - previousAttributes.muscleMass) / previousAttributes.muscleMass) * 100))}%`,
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {(currentAttributes.muscleMass - previousAttributes.muscleMass).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="attributes">
          <Card>
            <CardHeader>
              <CardTitle>Physical Attributes</CardTitle>
              <CardDescription>Update your measurements to see your avatar change</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm): {currentAttributes.height}</Label>
                <Slider
                  id="height"
                  min={150}
                  max={210}
                  step={1}
                  value={[currentAttributes.height]}
                  onValueChange={(value) => setCurrentAttributes({ ...currentAttributes, height: value[0] })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg): {currentAttributes.weight}</Label>
                <Slider
                  id="weight"
                  min={40}
                  max={150}
                  step={1}
                  value={[currentAttributes.weight]}
                  onValueChange={(value) => setCurrentAttributes({ ...currentAttributes, weight: value[0] })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyType">Body Type</Label>
                <Select
                  value={currentAttributes.bodyType}
                  onValueChange={(value) => setCurrentAttributes({ ...currentAttributes, bodyType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name} - {type.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyFat">Body Fat (%): {currentAttributes.bodyFat}</Label>
                <Slider
                  id="bodyFat"
                  min={5}
                  max={50}
                  step={1}
                  value={[currentAttributes.bodyFat]}
                  onValueChange={(value) => setCurrentAttributes({ ...currentAttributes, bodyFat: value[0] })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="muscleMass">Muscle Mass (%): {currentAttributes.muscleMass}</Label>
                <Slider
                  id="muscleMass"
                  min={20}
                  max={60}
                  step={1}
                  value={[currentAttributes.muscleMass]}
                  onValueChange={(value) => setCurrentAttributes({ ...currentAttributes, muscleMass: value[0] })}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  // Reset to previous values
                  setCurrentAttributes({ ...previousAttributes })
                }}
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  // Take a "photo" of current state
                  saveCurrentAsMilestone()
                }}
              >
                <Camera className="mr-2 h-4 w-4" />
                Capture Current State
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
