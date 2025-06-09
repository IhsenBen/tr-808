import * as Tone from "tone";

export interface EffectSettings {
  distortion: number; // 0-1
  filterFreq: number; // 20-20000
  filterRes: number; // 0-30
  compression: number; // 0-1
  bitDepth: number; // 1-8
  reverbAmount: number; // 0-1
  volume: number; // -60 to 6
  tune: number; // -12 to 12 semitones
}

export interface DrumEffects {
  distortion: Tone.Distortion;
  filter: Tone.Filter;
  compressor: Tone.Compressor;
  bitCrusher: Tone.BitCrusher;
  reverb: Tone.Reverb;
  channel: Tone.Channel;
}

export class DrumEffectsChain {
  public effects: DrumEffects;
  private player: Tone.Player;
  public pitchShift: Tone.PitchShift;

  constructor(player: Tone.Player) {
    this.player = player;

    this.effects = {
      distortion: new Tone.Distortion(0.4),
      filter: new Tone.Filter(20000, "lowpass"),
      compressor: new Tone.Compressor(-30, 3),
      bitCrusher: new Tone.BitCrusher(8),
      reverb: new Tone.Reverb(0.5),
      channel: new Tone.Channel(),
    };

    this.pitchShift = new Tone.PitchShift(0);

    // Connect the chain
    this.player.chain(
      this.pitchShift,
      this.effects.distortion,
      this.effects.bitCrusher,
      this.effects.filter,
      this.effects.compressor,
      this.effects.reverb,
      this.effects.channel,
    );
  }

  updateSettings(settings: Partial<EffectSettings>) {
    if (settings.distortion !== undefined) {
      this.effects.distortion.distortion = settings.distortion;
    }
    if (settings.filterFreq !== undefined) {
      this.effects.filter.frequency.value = settings.filterFreq;
    }
    if (settings.filterRes !== undefined) {
      this.effects.filter.Q.value = settings.filterRes;
    }
    if (settings.compression !== undefined) {
      this.effects.compressor.threshold.value = -30 + settings.compression * 25;
    }
    if (settings.bitDepth !== undefined) {
      this.effects.bitCrusher.bits = Math.max(1, Math.floor(settings.bitDepth));
    }
    if (settings.reverbAmount !== undefined) {
      this.effects.reverb.wet.value = settings.reverbAmount;
    }
    if (settings.volume !== undefined) {
      this.effects.channel.volume.value = settings.volume;
    }
    if (settings.tune !== undefined) {
      this.pitchShift.pitch = settings.tune;
    }
  }

  connect(destination: Tone.InputNode) {
    this.effects.channel.connect(destination);
  }

  dispose() {
    Object.values(this.effects).forEach((effect) => effect.dispose());
    this.pitchShift.dispose();
  }
}
