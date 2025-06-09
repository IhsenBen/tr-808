import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, StopCircle, RotateCcw } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleEffects,
  resetAllEffects,
} from "@/lib/features/effect/effectSlice";
import { RootState, AppDispatch } from "@/lib/store";

interface TransportControlsProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onBpmChange: (bpm: number) => void;
  isPlaying: boolean;
  currentBpm: number;
}

export const TransportControls: React.FC<TransportControlsProps> = ({
  onStart,
  onStop,
  onReset,
  onBpmChange,
  isPlaying,
  currentBpm,
}) => {
  const handleBpmInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBpm = parseInt(e.target.value, 10);
    if (!isNaN(newBpm) && newBpm >= 20 && newBpm <= 300) {
      onBpmChange(newBpm);
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const { effectsEnabled } = useSelector((state: RootState) => state.effects);
  return (
    <div className="flex items-center space-x-4 mb-8 justify-center  p-6 rounded-lg shadow-xl">
      <Button
        onClick={onStart}
        disabled={isPlaying}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg flex items-center"
      >
        <Play className="mr-2 h-5 w-5" /> Play
      </Button>
      <Button
        onClick={onStop}
        disabled={!isPlaying}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg flex items-center"
      >
        <StopCircle className="mr-2 h-5 w-5" /> Stop
      </Button>
      <Button
        onClick={onReset}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg flex items-center"
      >
        <RotateCcw className="mr-2 h-5 w-5" /> Reset
      </Button>
      <div className="flex items-center space-x-2">
        <label htmlFor="bpm-input" className="text-gray-300 font-semibold">
          BPM:
        </label>
        <Input
          id="bpm-input"
          type="number"
          value={currentBpm}
          onChange={handleBpmInputChange}
          min="20"
          max="300"
          className="w-24 bg-gray-700 text-white border-gray-600 focus:border-orange-500"
        />
      </div>

      <Button
        onClick={() => dispatch(toggleEffects())}
        className={`px-4 py-2 rounded ${
          effectsEnabled
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        Effects {effectsEnabled ? "ON" : "OFF"}
      </Button>

      <Button
        onClick={() => dispatch(resetAllEffects())}
        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
      >
        Reset All Effects
      </Button>
    </div>
  );
};
