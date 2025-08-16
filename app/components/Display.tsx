import React from "react";

interface EffectsPanelProps {
  padname: string;
}

export const Display: React.FC<EffectsPanelProps> = ({ padname }) => {
  return (
    <div className=" p-6 rounded-lg  min-w-[200px] flex items-center justify-center">
      <div
        id="display"
        className="display w-full flex items-center justify-center"
      >
        <h1 id="display" className="text-2xl font-mono">
          {padname}
        </h1>
      </div>
    </div>
  );
};
