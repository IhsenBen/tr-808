"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setSelectedDrum } from "@features/effect/effectSlice";
import { drumNames } from "@/lib/config";
import { useState } from "react";

export const DrumSelectorKnob = () => {
  const dispatch = useDispatch();
  const selectedTrack = useSelector(
    (state: RootState) => state.effects.selectedDrum,
  );
  const [angle, setAngle] = useState(0);

  const currentIndex = selectedTrack ? drumNames.indexOf(selectedTrack) : 0;

  const handleRotate = () => {
    const nextIndex = (currentIndex + 1) % drumNames.length;
    const nextDrum = drumNames[nextIndex];

    setAngle((360 / drumNames.length) * nextIndex);
    dispatch(setSelectedDrum(nextDrum));
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div
        className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 shadow-inner border-4 border-gray-600 flex items-center justify-center cursor-pointer transition-transform duration-300"
        onClick={handleRotate}
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <div className="w-2 h-6 bg-orange-500 rounded-sm" />
      </div>
      <p className="mt-4 text-lg font-bold text-orange-400 tracking-widest uppercase">
        {selectedTrack?.toUpperCase() ?? drumNames[0].toUpperCase()}
      </p>
    </div>
  );
};
