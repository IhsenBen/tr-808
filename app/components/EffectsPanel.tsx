import React from "react";
import { Button } from "@/components/ui/button";
import EffectKnob from "@components/EffectKnob";
import { EffectSettings } from "@/lib/effects";

interface EffectsPanelProps {
  drumName: string;
  settings: EffectSettings;
  onEffectChange: (effectName: keyof EffectSettings, value: number) => void;
  onReset: () => void;
  onCopyFrom: (fromDrum: string) => void;
  availableDrums: string[];
}

export const EffectsPanel: React.FC<EffectsPanelProps> = ({
  drumName,
  settings,
  onEffectChange,
  onReset,
  onCopyFrom,
  availableDrums,
}) => {
  const [showCopyMenu, setShowCopyMenu] = React.useState(false);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl min-w-[320px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-orange-500">
          {drumName.toUpperCase()} EFFECTS
        </h3>

        <div className="flex gap-2">
          <div className="relative">
            <Button
              size="sm"
              onClick={() => setShowCopyMenu(!showCopyMenu)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Copy
            </Button>

            {showCopyMenu && (
              <div className="absolute right-0 top-full mt-2 bg-gray-700 rounded-lg shadow-lg z-10 min-w-[120px]">
                {availableDrums
                  .filter((drum) => drum !== drumName)
                  .map((drum) => (
                    <button
                      key={drum}
                      onClick={() => {
                        onCopyFrom(drum);
                        setShowCopyMenu(false);
                      }}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg"
                    >
                      From {drum.toUpperCase()}
                    </button>
                  ))}
              </div>
            )}
          </div>

          <Button
            size="sm"
            onClick={onReset}
            className="bg-gray-600 hover:bg-gray-700"
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <EffectKnob
          label="TUNE"
          value={settings.tune}
          min={-12}
          max={12}
          step={1}
          onChange={(value) => onEffectChange("tune", value)}
          unit="st"
        />

        <EffectKnob
          label="VOLUME"
          value={settings.volume}
          min={-60}
          max={6}
          step={1}
          onChange={(value) => onEffectChange("volume", value)}
          unit="dB"
        />

        <EffectKnob
          label="DISTORTION"
          value={settings.distortion}
          min={0}
          max={1}
          step={0.01}
          onChange={(value) => onEffectChange("distortion", value)}
        />

        <EffectKnob
          label="BIT DEPTH"
          value={settings.bitDepth}
          min={1}
          max={8}
          step={1}
          onChange={(value) => onEffectChange("bitDepth", value)}
          unit="bits"
        />

        <EffectKnob
          label="FILTER FREQ"
          value={settings.filterFreq}
          min={20}
          max={20000}
          step={50}
          onChange={(value) => onEffectChange("filterFreq", value)}
          unit="Hz"
        />

        <EffectKnob
          label="FILTER RES"
          value={settings.filterRes}
          min={0}
          max={30}
          step={0.1}
          onChange={(value) => onEffectChange("filterRes", value)}
        />

        <EffectKnob
          label="COMPRESSION"
          value={settings.compression}
          min={0}
          max={1}
          step={0.01}
          onChange={(value) => onEffectChange("compression", value)}
        />

        <EffectKnob
          label="REVERB"
          value={settings.reverbAmount}
          min={0}
          max={1}
          step={0.01}
          onChange={(value) => onEffectChange("reverbAmount", value)}
        />
      </div>
    </div>
  );
};
