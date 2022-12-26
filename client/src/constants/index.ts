export const dragAndDropRoomsMessage = "Tip: Drag rooms to group together.";

export const dragAndDropTracksInQueueMessage = "Tip: Drag songs to reorder queue.";

export const PlayState = Object.freeze({
  playing: "PLAYING",
  paused: "PAUSED_PLAYBACK",
  transitioning: "TRANSITIONING",
  stopped: "STOPPED",
});

export const PlayMode = Object.freeze({
  normal: "NORMAL",
  shuffle: "SHUFFLE_NOREPEAT",
  shuffleRepeat: "SHUFFLE",
  repeat: "REPEAT_ALL",
  shuffleRepeatOne: "SHUFFLE_REPEAT_ONE",
  repeatOne: "REPEAT_ONE",
});

export const TransportActions = Object.freeze({
  set: "Set",
  stop: "Stop",
  pause: "Pause",
  play: "Play",
  seek: "X_DLNA_SeekTime",
  next: "Next",
  previous: "Previous",
  seekTrack: "X_DLNA_SeekTrackNr",
});
