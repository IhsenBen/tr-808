"use client";
import { setBpm } from "@/lib/features/sequencer/sequencerSlice";
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";

const minBPM = 40;
const maxBPM = 240;

export const BpmKnob = () => {
  const dispatch = useDispatch();
  const currentBpm = useSelector((state: RootState) => state.sequencer.bpm);

  const angle = ((currentBpm - minBPM) / (maxBPM - minBPM)) * 595;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    dispatch(setBpm(value));
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="relative flex flex-col items-center">
        <div
          className="tr808-knob"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="tr808-indicator" />
        </div>
        <input
          type="range"
          min={minBPM}
          max={maxBPM}
          value={currentBpm}
          onChange={handleChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ top: 0, left: 0 }}
        />
      </div>
      <p className="mt-4 text-lg font-bold text-orange-400 tracking-widest uppercase">
        {currentBpm} BPM
      </p>
    </div>
  );
};
