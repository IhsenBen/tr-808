import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NUM_STEPS, NUM_TRACKS } from "@/lib/config";

interface SequencerState {
  pattern: number[][];
  currentStep: number;
  isPlaying: boolean;
  isAudioReady: boolean;
  selectedTrack: number;
  areSamplesLoaded: boolean;
  bpm: number;
}

const initialState: SequencerState = {
  pattern: Array(NUM_TRACKS)
    .fill(0)
    .map(() => Array(NUM_STEPS).fill(0)),
  currentStep: 0,
  isPlaying: false,
  isAudioReady: false,
  areSamplesLoaded: false,
  selectedTrack: 1,
  bpm: 120,
};

export const sequencerSlice = createSlice({
  name: "sequencer",
  initialState,
  reducers: {
    toggleStep: (
      state,
      action: PayloadAction<{ row: number; col: number }>,
    ) => {
      const { row, col } = action.payload;
      state.pattern[row][col] = state.pattern[row][col] === 1 ? 0 : 1;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setSelectedTrack: (state, action: PayloadAction<number>) => {
      state.selectedTrack = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsAudioReady: (state, action: PayloadAction<boolean>) => {
      state.isAudioReady = action.payload;
    },
    setAreSamplesLoaded: (state, action: PayloadAction<boolean>) => {
      state.areSamplesLoaded = action.payload;
    },
    setBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload;
    },
    resetPattern: (state) => {
      state.pattern = Array(NUM_TRACKS)
        .fill(0)
        .map(() => Array(NUM_STEPS).fill(0));
    },
  },
});

export const {
  toggleStep,
  setCurrentStep,
  setIsPlaying,
  setIsAudioReady,
  setAreSamplesLoaded,
  setSelectedTrack,
  setBpm,
  resetPattern,
} = sequencerSlice.actions;

export default sequencerSlice.reducer;
