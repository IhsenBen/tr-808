"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { toggleStep } from "@features/sequencer/sequencerSlice";
import { Button } from "@/components/ui/button";
import { drumNames } from "@/lib/config";

export const SequencerGrid: React.FC = () => {
  const dispatch = useDispatch();
  const { pattern, currentStep } = useSelector(
    (state: RootState) => state.sequencer,
  );
  const selectedDrum = useSelector(
    (state: RootState) => state.effects.selectedDrum,
  );

  if (!selectedDrum) {
    return (
      <div className="text-center text-gray-400 mt-4">
        Please select a drum using the knob.
      </div>
    );
  }

  const rowIndex = drumNames.indexOf(selectedDrum);
  const row = pattern[rowIndex];

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-xl">
      <div className="flex items-center mb-2">
        <div className="w-24 text-right pr-4 font-semibold text-lg text-orange-500 bg-orange-500/20 py-1 px-2 rounded-l-lg">
          {selectedDrum.toUpperCase()}
        </div>
        <div className="flex space-x-1">
          {row.map((cell, colIndex) => (
            <Button
              key={colIndex}
              onClick={() =>
                dispatch(toggleStep({ row: rowIndex, col: colIndex }))
              }
              className={`w-8 h-14 rounded-sm transition-all duration-100 ease-in-out
                ${cell === 1 ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-600 hover:bg-gray-700"}
                ${
                  colIndex === currentStep
                    ? "border-2 border-blue-400 shadow-lg scale-105"
                    : ""
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
