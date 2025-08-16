"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { toggleStep } from "@features/sequencer/sequencerSlice";
import { Button } from "@/components/ui/button";
import { setSelectedDrum } from "@/lib/features/effect/effectSlice";
import { drumNames } from "@/lib/config";

export const SequencerGrid: React.FC = () => {
  const dispatch = useDispatch();
  const { pattern, currentStep } = useSelector(
    (state: RootState) => state.sequencer,
  );

  const handleDrumSelect = (drumName: string) =>
    dispatch(setSelectedDrum(drumName));
  return (
    <div className="flex flex-col items-center mx-auto max-w-2xl p-4">
      {drumNames.map((drum, rowIndex) => (
        <div key={drum} className="flex items-center justify-center mb-2">
          <Button
            onClick={() => handleDrumSelect(drum)}
            className="w-24 text-right  font-semibold text-lg text-orange-500 bg-orange-500/20 py-1 px-2 rounded-l-lg credit"
          >
            {drum.toUpperCase()}
          </Button>
          <div className="flex space-x-1 items-center justify-between flex-grow">
            {pattern[rowIndex].map((cell, colIndex) => (
              <Button
                key={colIndex}
                onClick={() => {
                  dispatch(setSelectedDrum(drum));
                  dispatch(toggleStep({ row: rowIndex, col: colIndex }));
                }}
                className={`w-8 h-14 rounded-sm transition-all duration-100 ease-in-out
                  ${cell === 1 ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-700 hover:bg-gray-800"}
                  ${
                    colIndex === currentStep
                      ? "border-2 border-blue-400 shadow-lg scale-105"
                      : ""
                  }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
