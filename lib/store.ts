import { configureStore } from "@reduxjs/toolkit";
import sequencerReducer from "@features/sequencer/sequencerSlice";
import effectsReducer from "@features/effect/effectSlice";

export const store = configureStore({
  reducer: {
    sequencer: sequencerReducer,
    effects: effectsReducer,
  },
  // Example (if needed, but ideally avoid storing non-serializable data):
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredPaths:,
  //       ignoredActions: ['some/action/type'],
  //     },
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
