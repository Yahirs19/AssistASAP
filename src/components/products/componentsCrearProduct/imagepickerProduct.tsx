import { useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import React from "react";
// Otros imports necesarios

// Tu código aquí

interface ImagePickerProps {
  setImage: (imageUrl: string) => void;
}

function ImagePicker({ setImage }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  function handlePickClick() {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPickedImage(fileReader.result);
        setImage(fileReader.result);
      }
    };

    fileReader.readAsDataURL(file);
    console.log("imageUrl: ", pickedImage);
  }

  return (
    <>
      <div>
        <div className="flex flex-col items-start gap-0 mb-4">
          <div className="flex items-start gap-4">
            <div className="w-40 h-40 border-solid border-2 border-color-black flex justify-center items-center  relative">
              {pickedImage ? (
                <Image
                  className="object-cover"
                  src={pickedImage}
                  alt="Image Selected"
                  layout="fill"
                />
              ) : (
                <p className="m-0 text-gray-300">No image picked yet.</p>
              )}
            </div>
            <Button
              className="bg-gray-500"
              type="button"
              onClick={handlePickClick}
            >
              Pick an Image
            </Button>
          </div>

          <Input
            className="h-1 opacity-0 z-[-1]"
            type="file"
            accept="image/png, image/jpeg"
            ref={imageInputRef}
            onChange={handleImageChange}
          />
        </div>
      </div>
    </>
  );
}

export default ImagePicker;
