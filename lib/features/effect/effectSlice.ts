import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { drumNames } from "@/lib/config";
import { EffectSettings } from "@lib/effects";

export interface DrumEffectsState {
  [drumName: string]: EffectSettings;
}

interface EffectsState {
  drumEffects: DrumEffectsState;
  selectedDrum: string | null;
  effectsEnabled: boolean;
}

const defaultEffectSettings: EffectSettings = {
  distortion: 0.2,
  filterFreq: 20000,
  filterRes: 1,
  compression: 0.3,
  bitDepth: 8,
  reverbAmount: 0.1,
  volume: 0,
  tune: 0,
};

const initialState: EffectsState = {
  drumEffects: drumNames.reduce((acc, drumName) => {
    acc[drumName] = { ...defaultEffectSettings };
    return acc;
  }, {} as DrumEffectsState),
  selectedDrum: drumNames[0] || null,
  effectsEnabled: true,
};

export const effectsSlice = createSlice({
  name: "effects",
  initialState,
  reducers: {
    updateDrumEffect: (
      state,
      action: PayloadAction<{
        drumName: string;
        effectName: keyof EffectSettings;
        value: number;
      }>,
    ) => {
      const { drumName, effectName, value } = action.payload;
      if (state.drumEffects[drumName]) {
        state.drumEffects[drumName][effectName] = value;
      }
    },

    setSelectedDrum: (state, action: PayloadAction<string | null>) => {
      state.selectedDrum = action.payload;
      console.log(action.payload, "selected drum");
    },

    resetDrumEffects: (state, action: PayloadAction<string>) => {
      const drumName = action.payload;
      if (state.drumEffects[drumName]) {
        state.drumEffects[drumName] = { ...defaultEffectSettings };
      }
    },

    resetAllEffects: (state) => {
      Object.keys(state.drumEffects).forEach((drumName) => {
        state.drumEffects[drumName] = { ...defaultEffectSettings };
      });
    },

    toggleEffects: (state) => {
      state.effectsEnabled = !state.effectsEnabled;
    },

    setEffectsEnabled: (state, action: PayloadAction<boolean>) => {
      state.effectsEnabled = action.payload;
    },

    copyEffects: (
      state,
      action: PayloadAction<{ from: string; to: string }>,
    ) => {
      const { from, to } = action.payload;
      if (state.drumEffects[from] && state.drumEffects[to]) {
        state.drumEffects[to] = { ...state.drumEffects[from] };
      }
    },

    initializeDrumEffects: (state, action: PayloadAction<string[]>) => {
      const drumNames = action.payload;
      const newDrumEffects: DrumEffectsState = {};

      drumNames.forEach((drumName) => {
        newDrumEffects[drumName] = state.drumEffects[drumName] || {
          ...defaultEffectSettings,
        };
      });

      state.drumEffects = newDrumEffects;
    },
  },
});

export const {
  updateDrumEffect,
  setSelectedDrum,
  resetDrumEffects,
  resetAllEffects,
  toggleEffects,
  setEffectsEnabled,
  copyEffects,
  initializeDrumEffects,
} = effectsSlice.actions;

export default effectsSlice.reducer;
