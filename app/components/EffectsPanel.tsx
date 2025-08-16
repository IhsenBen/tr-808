import React from "react";
import { Button } from "@/components/ui/button";
import EffectKnob from "@components/EffectKnob";
import { EffectSettings } from "@/lib/effects";
import { Display } from "./Display";
import { useSelector, useDispatch } from "react-redux";
import { toggleEffects } from "@/lib/features/effect/effectSlice";
import { RootState, AppDispatch } from "@/lib/store";

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

  const dispatch = useDispatch<AppDispatch>();
  const { effectsEnabled } = useSelector((state: RootState) => state.effects);
  return (
    <div className="p-15 rounded-lg  min-w-[320px]">
      <div>
        <Display padname={drumName.toUpperCase()} />

        <div className="flex gap-2">
          <div className="flex-1">
            <div className="flex flex-row items-center justify-center gap-3   rounded-lg ">
              <Button
                size="sm"
                onClick={onReset}
                className="tr808-btn-3d reset-btn mt-4"
              >
                Reset
              </Button>
              <Button
                size="sm"
                onClick={() => setShowCopyMenu(!showCopyMenu)}
                className="tr808-btn-3d copy-btn mt-4"
              >
                Copy
              </Button>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 ">
              <span className="text-xs font-semibold tracking-widest uppercase mr-2 ">
                Effects:
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => dispatch(toggleEffects())}
                  className={`tr808-switch ${effectsEnabled ? "is-on" : "is-off"}`}
                ></Button>

                <div className="flex flex-col text-xs font-mono text-white gap-5">
                  <span>ON</span>
                  <span>OFF</span>
                </div>
              </div>
            </div>
          </div>
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
