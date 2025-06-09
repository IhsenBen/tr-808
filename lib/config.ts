export const sampleMap: Record<string, string> = {
  kick: "/samples/kick.wav",
  snare: "/samples/snare.wav",
  hat: "/samples/openhat.wav",
  clap: "/samples/clap.wav",
  tomhigh: "/samples/tomhigh.wav",
};

export const drumNames = Object.keys(sampleMap) as Array<
  keyof typeof sampleMap
>;
export const NUM_STEPS = 16;
export const NUM_TRACKS = Object.keys(sampleMap).length;
