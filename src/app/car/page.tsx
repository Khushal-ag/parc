"use client";

import { useRef, useState } from "react";
import { Camera, Search } from "lucide-react";
import toast from "react-hot-toast";

import {
  bookCarSlot,
  getCarByLicense,
  removeCarSlot,
} from "@/lib/services/apiCarPark";
import { getAvailableCarSlots } from "@/lib/services/apiSlots";
import Button from "@/components/ui/Button";
import AddCar from "./AddCar";
import ParkCar from "./ParkCar";
import UnParkCar from "./UnParkCar";

function Car() {
  const [licensePlate, setLicencePlate] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handlePark = async () => {
    try {
      const data = await getCarByLicense({ license_no: licensePlate });
      if (data.length != 0) {
        if (data[0].slot_occupied === null) {
          const slots = await getAvailableCarSlots();
          if (slots.length != 0) {
            bookCarSlot({
              license_no: licensePlate,
              slot_no: slots[0].slot_no,
            });
            toast.success("Car parked successfully");
          } else toast.error("No slots available");
        } else {
          toast.error("Car already parked");
        }
      } else toast.error("Car not found");
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setLicencePlate("");
    }
  };

  const removePark = async () => {
    try {
      const data = await getCarByLicense({ license_no: licensePlate });
      if (data.length != 0) {
        if (data[0].slot_occupied != null) {
          await removeCarSlot(licensePlate);
          toast.success("Car unparked successfully");
        } else {
          toast.error("Car not parked");
        }
      } else toast.error("Car not found");
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setLicencePlate("");
    }
  };

  const handleScanButtonClick = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleCaptureButtonClick = () => {
    if (!canvasRef.current || !videoRef.current || !stream) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas image to data URL
      const imageDataUrl = canvas.toDataURL("image/jpeg");
      console.log(imageDataUrl);
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);

      // Send imageDataUrl to backend API for processing
      // You can use fetch or axios to make a POST request to your backend API
    }
  };

  return (
    <>
      <section className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex w-full justify-center gap-4">
          <input
            type="text"
            placeholder="Enter Licence plate no.."
            className="w-1/3 rounded-md border-2 px-2 py-3"
            value={licensePlate}
            onChange={(e) => setLicencePlate(e.target.value)}
          />
          <Button type="primary" onPress={handleScanButtonClick}>
            <Search size={22} className="mr-2" />
            Scan
          </Button>
          {stream && (
            <Button type="primary" onPress={handleCaptureButtonClick}>
              <Camera size={22} className="mr-2" />
              Capture
            </Button>
          )}
        </div>
        <div className="flex w-1/2 justify-center gap-3">
          <ParkCar onPark={handlePark} />

          <UnParkCar onUnpark={removePark} />

          <AddCar />
        </div>
        <div className="flex min-w-min">
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <video
            ref={videoRef}
            autoPlay
            style={{ display: "block", width: "100%" }}
          />
        </div>
      </section>
    </>
  );
}

export default Car;
