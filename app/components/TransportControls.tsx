import React from "react";
import { Button } from "@/components/ui/button";
import { BpmKnob } from "./BPMKnob";
import { RotateCcw } from "lucide-react";

interface TransportControlsProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  isPlaying: boolean;
}

export const TransportControls: React.FC<TransportControlsProps> = ({
  onStart,
  onStop,
  onReset,
  isPlaying,
}) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="px-16">
        <BpmKnob />
      </div>
      <div className="flex items-center space-x-4">
        <button
          className={`tr808-btn ${isPlaying ? "led-on" : ""}`}
          onClick={isPlaying ? onStop : onStart}
        >
          <span>Start</span>
          <div className="divider"></div>
          <span>Stop</span>
        </button>

        <Button className="tr808-btn-3d reset-btn" onClick={onReset}>
          <RotateCcw className="mr-2 h-5 w-5" /> Reset
        </Button>
      </div>
    </div>
  );
};
