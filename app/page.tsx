"use client";
import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState, AppDispatch } from "@/lib/store";
import {
  setCurrentStep,
  setIsPlaying,
  setIsAudioReady,
  setAreSamplesLoaded,
  resetPattern,
} from "@features/sequencer/sequencerSlice";
import {
  initializeDrumEffects,
  updateDrumEffect,
  copyEffects,
  resetDrumEffects,
} from "@features/effect/effectSlice";
import { DrumEffectsChain, EffectSettings } from "@/lib/effects";
import { SequencerGrid } from "@components/SequencerGrid";
import { Separator } from "@/components/ui/separator";
import { TransportControls } from "@components/TransportControls";
import { EffectsPanel } from "@components/EffectsPanel";
import { Button } from "@/components/ui/button";
import { sampleMap, NUM_STEPS, drumNames } from "@/lib/config";

// it's obviously redundant to have tailwind and custom css, but my aim was just to get this working quickly,
//Just having fun and testing for now, I didn't care much about the "code quality"

//FIXME: Don't work properly with chrominium-based browsers
//TODO: Add classic breakbeats patterns
//TODO: Add circle of fifths chord progression patterns with tone.js synths
//TODO: MIDI support for external devices
//TODO: refractor and clean up the components and code structure

function SequencerContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { pattern, isPlaying, isAudioReady, areSamplesLoaded, bpm } =
    useSelector((state: RootState) => state.sequencer);
  const { drumEffects, selectedDrum, effectsEnabled } = useSelector(
    (state: RootState) => state.effects,
  );

  const playersRef = useRef<Tone.Players | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);
  const stepRef = useRef(0);
  const effectChainsRef = useRef<Map<string, DrumEffectsChain>>(new Map());
  const patternRef = useRef(pattern);

  useEffect(() => {
    patternRef.current = pattern;
  }, [pattern]);

  //init Tone.js and load samples
  useEffect(() => {
    if (!isAudioReady) return;

    const initTone = async () => {
      if (!playersRef.current) {
        const loadedPlayers = new Tone.Players(sampleMap, () => {
          dispatch(setAreSamplesLoaded(true));

          dispatch(initializeDrumEffects(drumNames));

          drumNames.forEach((drumName) => {
            const player = loadedPlayers.player(drumName);

            const effectChain = new DrumEffectsChain(player);
            effectChain.connect(Tone.getDestination());

            player.connect(effectChain.pitchShift);

            // Add fallback direct connection for debugging
            // player.connect(Tone.getDestination()); // Uncomment this line to test

            effectChainsRef.current.set(drumName, effectChain);
          });
        });
        playersRef.current = loadedPlayers;
      }
    };

    initTone();

    //  cleanup refs
    return () => {
      effectChainsRef.current.forEach((effectChain) => {
        effectChain.dispose();
      });
      effectChainsRef.current?.clear();

      if (playersRef.current) {
        playersRef.current.dispose();
        playersRef.current = null;
      }
      if (loopRef.current) {
        loopRef.current.stop();
        loopRef.current.dispose();
        loopRef.current = null;
      }
      if (Tone.getTransport().state === "started") {
        Tone.getTransport().stop();
      }
    };
  }, [isAudioReady, dispatch]);

  //update effefct
  useEffect(() => {
    if (!effectsEnabled) return;

    effectChainsRef.current.forEach((effectChain, drumName) => {
      const settings = drumEffects[drumName];
      if (settings) {
        effectChain.updateSettings(settings);
      }
    });
  }, [drumEffects, effectsEnabled]);

  const startSequencer = () => {
    if (!isAudioReady) {
      Tone.start();
      dispatch(setIsAudioReady(true));
    }
    if (!areSamplesLoaded || isPlaying) {
      console.warn(
        "Cannot start sequencer: Audio not ready, samples not loaded, or already playing.",
      );
      return;
    }

    if (loopRef.current) {
      loopRef.current.stop();
      loopRef.current.dispose();
    }

    const newLoop = new Tone.Loop((time) => {
      const step = stepRef.current;

      patternRef.current.forEach((row, rowIndex) => {
        if (row[step] === 1) {
          const drum = drumNames[rowIndex];
          if (playersRef.current?.has(drum)) {
            //  player --> effect chain
            playersRef.current.player(drum).start(time + 0.02);
          }
        }
      });

      dispatch(setCurrentStep(step));
      stepRef.current = (step + 1) % NUM_STEPS;
    }, "16n");

    newLoop.start(0);
    Tone.getTransport().start();
    Tone.getTransport().bpm.value = bpm;
    loopRef.current = newLoop;
    dispatch(setIsPlaying(true));
  };

  const stopSequencer = () => {
    if (loopRef.current) {
      loopRef.current.stop();
      loopRef.current.dispose();
      loopRef.current = null;
    }
    if (Tone.getTransport().state === "started") {
      Tone.getTransport().stop();
    }
    dispatch(setIsPlaying(false));
    dispatch(setCurrentStep(0));
  };

  useEffect(() => {
    Tone.getTransport().bpm.value = bpm;
  }, [bpm]);

  const handleResetPattern = () => {
    stopSequencer();
    dispatch(resetPattern());
  };
  const handleEffectChange = (
    effectName: keyof EffectSettings,
    value: number,
  ) => {
    if (selectedDrum) {
      dispatch(
        updateDrumEffect({
          drumName: selectedDrum,
          effectName,
          value,
        }),
      );
    }
  };

  const handleResetDrumEffects = () => {
    if (selectedDrum) {
      dispatch(resetDrumEffects(selectedDrum));
    }
  };

  const handleCopyEffects = (fromDrum: string) => {
    if (selectedDrum && fromDrum !== selectedDrum) {
      dispatch(copyEffects({ from: fromDrum, to: selectedDrum }));
    }
  };

  return (
    <div
      className="App"
      onClick={() => {
        if (!isAudioReady) {
          Tone.start();
          dispatch(setIsAudioReady(true));
        }
      }}
    >
      {/* {!isAudioReady && ( */}
      {/*   <Button */}
      {/*     onClick={async () => { */}
      {/*       await Tone.start(); */}
      {/*       dispatch(setIsAudioReady(true)); */}
      {/*     }} */}
      {/*   > */}
      {/*     Start Audio */}
      {/*   </Button> */}
      {/* )} */}
      <div id="drum-machine" className=" items-center container ">
        <div className="header-title shadow-2xl">
          <div id="name" className="title">
            <h1>
              Rhythm Composer
              <span>JS-808</span>
            </h1>
            <h2>React Controlled</h2>
          </div>
          <Separator className="my-4" />
        </div>

        <div className="flex gap-8 mt-8 items-center justify-center shadow-2xl">
          <div className="flex flex-col shadow-2xl">
            <TransportControls
              onStart={startSequencer}
              onStop={stopSequencer}
              onReset={handleResetPattern}
              isPlaying={isPlaying}
            />
          </div>
          {selectedDrum && (
            <EffectsPanel
              drumName={selectedDrum}
              settings={drumEffects[selectedDrum]}
              onEffectChange={handleEffectChange}
              onReset={handleResetDrumEffects}
              onCopyFrom={handleCopyEffects}
              availableDrums={Object.keys(sampleMap)}
            />
          )}

          <SequencerGrid />
        </div>
      </div>
    </div>
  );
}

export default function Sequencer() {
  return (
    <Provider store={store}>
      <SequencerContent />
    </Provider>
  );
}
