"use client";
import { MoodBoardImage, useMoodBoard } from "@/hooks/use-styles";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import ImagesBoard from "./ImagesBoard";
import { Plus, Sparkle, Upload } from "lucide-react";
import { Button } from "../ui/button";


type Props = {
    guideImages: MoodBoardImage[];
}

const MoodBoard = ({ guideImages }: Props) => {

    const {
        images,
        dragActive,
        removeImages,
        handleDrag,
        handleDrop,
        handleFileInput,
        canAddMore,
    } = useMoodBoard(guideImages);

    const fileInputRef = useRef<HTMLInputElement>(null)
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    }

    return (
        <div className="flex flex-col gap-10">
            <div className={
                cn(`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-200 min-h-[400px] flex items-center justify-center`,
                    dragActive ? "border-primary bg-primary/5 scale-[1.02]"
                        : "border-border/50 hover:border-border"
                )
            }
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-3xl" />
                </div>
                {images?.length > 0 && (
                    <>
                        <div className="lg:hidden absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                {images?.map((image, index) => {

                                    const seed = image.id
                                        .split("")
                                        .reduce((a, b) => a + b.charCodeAt(0), 0);

                                    const RANDOM_1 = ((seed * 9301 + 49297) % 233280) / 233280
                                    const RANDOM_2 = (((seed + 1) * 9301 + 49297) % 233280) / 233280
                                    const RANDOM_3 = (((seed + 2) * 9301 + 49297) % 233280) / 233280

                                    const ROTATION = (RANDOM_1 - 0.5) * 50
                                    const X_OFFSET = (RANDOM_2 - 0.5) * 40
                                    const Y_OFFSET = (RANDOM_3 - 0.5) * 30

                                    return (
                                        <ImagesBoard
                                            key={`mobile-${image.id}`}
                                            image={image}
                                            removeImage={removeImages}
                                            xOffSet={X_OFFSET}
                                            yOffSet={Y_OFFSET}
                                            rotation={ROTATION}
                                            zIndex={index + 1}
                                            marginLeft="-80px"
                                            marginTop="-96px"
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <div className="hidden lg:flex absolute inset-0 items-center justify-center">
                            <div className="relative w-full max-w-[700px] h-[300px] mx-auto">
                                {images?.map((image, index) => {

                                    const seed = image.id
                                        .split("")
                                        .reduce((a, b) => a + b.charCodeAt(0), 0);

                                    const RANDOM_1 = ((seed * 9301 + 49297) % 233280) / 233280
                                    const RANDOM_2 = (((seed + 1) * 9301 + 49297) % 233280) / 233280
                                    const RANDOM_3 = (((seed + 2) * 9301 + 49297) % 233280) / 233280

                                    const imageWidth = 192
                                    const overlapAmount = 30
                                    const spacing = imageWidth - overlapAmount

                                    const ROTATION = (RANDOM_1 - 0.5) * 50
                                    const X_OFFSET = index * spacing - ((images.length - 1)) * spacing / 2
                                    const Y_OFFSET = (RANDOM_3 - 0.5) * 30

                                    return (
                                        <ImagesBoard
                                            key={`mobile-${image.id}`}
                                            image={image}
                                            removeImage={removeImages}
                                            xOffSet={X_OFFSET}
                                            yOffSet={Y_OFFSET}
                                            rotation={ROTATION}
                                            zIndex={index + 1}
                                            marginLeft="-80px"
                                            marginTop="40px"
                                        />
                                    )
                                })}
                            </div>
                        </div>

                    </>
                )}

                {
                    images.length === 0 && (
                        <div className="relative z-10 space-y-6">
                            <div className="mx-auto w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                                <Upload className="w-8 h-8 text-muted-foreground" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-medium text-foreground">Drop your images here</h3>
                                <p className="text-sm text-muted-foreground max-w-md mx-auto">Drag and drop up to 5 images to build your mood board</p>
                            </div>

                            <Button onClick={handleUploadClick} variant={"outline"}>
                                <Upload className="w-4 h-4" />
                                Choose Files
                            </Button>
                        </div>
                    )
                }

                {
                    images.length > 0 && canAddMore && (
                        <div className="absolute bottom-6 right-6 z-20">
                            <Button onClick={handleUploadClick} size={"sm"} variant={"outline"}>
                                <Plus className="w-4 h-4" />
                                Add More
                            </Button>
                        </div>
                    )
                }
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                />
            </div>
            <Button disabled={images.length === 0} className="w-fit" size={"lg"}>
                Generate Style Guide <Sparkle />
            </Button>
            {
                images.length >= 5 && (
                    <div className="text-center p-4 bg-muted/50 rounded-2xl">
                        <p className="text-sm text-amber-500">Maximum of 5 images reached. Remove an image to add more</p>
                    </div>
                )
            }
        </div>
    )
}

export default MoodBoard