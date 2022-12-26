<template>
  <shuffle
    :class="shuffleActive ? 'text-blue-500' : 'text-slate-300'"
    class="mr-4 cursor-pointer text-2xl"
    @click="toggleShuffle"
  />

  <skip-previous
    :disabled="!previousEnabled"
    class="mr-2 cursor-pointer text-4xl text-slate-300"
    :class="{ 'text-slate-500': !previousEnabled }"
    @click="previous"
  />

  <play-state-icon
    :disabled="!playStateEnabled"
    class="cursor-pointer text-6xl text-slate-300"
    :class="{ 'text-slate-500': !playStateEnabled }"
    @click="playOrPause"
  />

  <skip-next
    :disabled="!nextEnabled"
    class="ml-2 cursor-pointer text-4xl text-slate-300"
    :class="{ 'text-slate-500': !nextEnabled }"
    @click="next"
  />

  <repeat-icon
    :class="repeatActive ? 'text-blue-500' : 'text-slate-300'"
    class="ml-4 cursor-pointer text-2xl text-slate-300"
    @click="toggleRepeat"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import appStore from "@/store";
import groupsAPI from "@/services/API/groups";
import updateZoneGroup from "@/helpers/updateZoneGroup";
import { IZoneGroups } from "@/types/IStore";
import { TransportActions, PlayState, PlayMode } from "@/constants";

import { Play, Pause, SkipPrevious, SkipNext, Shuffle, Repeat, RepeatOnce, RepeatOff } from "mdue";

const activeZoneGroup = computed(() => appStore.global.activeZoneGroup());
const activeZoneGroupId = computed(() => appStore.global.activeZoneGroupId);

const RepeatIcon = computed(() => {
  if (activeZoneGroup.value) {
    const playMode = activeZoneGroup.value.playMode;
    switch (playMode) {
      case PlayMode.shuffleRepeat:
      case PlayMode.repeat:
        return Repeat;
      case PlayMode.shuffleRepeatOne:
      case PlayMode.repeatOne:
        return RepeatOnce;
      default:
        return RepeatOff;
    }
  }
  return Repeat;
});

const previousEnabled = () => {
  if (activeZoneGroup.value) {
    if (
      activeZoneGroup.value.actions.some((action: string) => action === TransportActions.previous)
    ) {
      return true;
    }
    return false;
  }
  return false;
};

const nextEnabled = () => {
  if (activeZoneGroup.value) {
    if (activeZoneGroup.value.actions.some((action: string) => action === TransportActions.next)) {
      return true;
    }
    return false;
  }
  return false;
};

const playStateEnabled = () => {
  if (activeZoneGroup.value) {
    if (activeZoneGroup.value.actions.some((action: string) => action === TransportActions.play)) {
      return true;
    }
    return false;
  }
  return false;
};

const PlayStateIcon = computed(() => {
  if (activeZoneGroup.value) {
    const playState = activeZoneGroup.value.state;

    switch (playState) {
      case PlayState.playing:
      case PlayState.transitioning:
        return Pause;
      default:
        return Play;
    }
  }
  return Play;
});
const shuffleActive = computed(() => {
  if (activeZoneGroup.value) {
    const playMode = activeZoneGroup.value.playMode;
    switch (playMode) {
      case PlayMode.shuffle:
      case PlayMode.shuffleRepeat:
      case PlayMode.shuffleRepeatOne:
        return true;
      default:
        return false;
    }
  }
  return false;
});

const repeatActive = computed(() => {
  if (activeZoneGroup.value) {
    const playMode = activeZoneGroup.value.playMode;
    switch (playMode) {
      case PlayMode.shuffleRepeat:
      case PlayMode.repeat:
      case PlayMode.shuffleRepeatOne:
      case PlayMode.repeatOne:
        return true;
      default:
        return false;
    }
  }
  return false;
});

function playOrPause() {
  const playState = activeZoneGroup.value.state;

  if (playState === "PLAYING") {
    pause();
  } else {
    play();
  }
}

function play() {
  groupsAPI.play(activeZoneGroupId.value);

  const data: IZoneGroups = {
    groupId: activeZoneGroupId.value,
    update: { state: PlayState.playing },
  };
  updateZoneGroup(data);
}

function pause() {
  groupsAPI.pause(activeZoneGroupId.value);

  const data: IZoneGroups = {
    groupId: activeZoneGroupId.value,
    update: { state: PlayState.paused },
  };
  updateZoneGroup(data);
}

function next() {
  groupsAPI.next(activeZoneGroupId.value);
}

function previous() {
  groupsAPI.previous(activeZoneGroupId.value);
}

function toggleShuffle() {
  if (activeZoneGroup.value) {
    let playMode = null;
    const currentPlayMode = activeZoneGroup.value.playMode;
    // Shuffle is on, we want to turn it off
    if (shuffleActive.value) {
      if (repeatActive.value) {
        if (currentPlayMode === PlayMode.shuffleRepeat) {
          playMode = PlayMode.repeat;
        } else {
          playMode = PlayMode.repeatOne;
        }
      } else {
        // Repeat is NOT active & we are turning shuffle off
        playMode = PlayMode.normal;
      }
      // Shuffle is off, we want to turn it on
    } else if (repeatActive.value) {
      if (currentPlayMode === PlayMode.repeat) {
        playMode = PlayMode.shuffleRepeat;
      } else {
        playMode = PlayMode.shuffleRepeatOne;
      }
    } else {
      // Repeat is NOT active & we are turning shuffle on
      playMode = PlayMode.shuffle;
    }

    const data = { groupId: activeZoneGroupId.value, update: { playMode } };

    updateZoneGroup(data);

    groupsAPI.playMode(activeZoneGroupId.value, playMode);
  }
}

function toggleRepeat() {
  if (activeZoneGroup.value) {
    let playMode = null;
    const currentPlayMode = activeZoneGroup.value.playMode;
    // Repeat is on, we want to turn it off or advance to repeat one
    if (repeatActive.value) {
      if (shuffleActive.value) {
        // toggle to shuffle repeat one or turn off repeat to shuffle only
        if (currentPlayMode === PlayMode.shuffleRepeat) {
          playMode = PlayMode.shuffleRepeatOne;
        } else {
          playMode = PlayMode.shuffle;
        }
        // toggle to repeat one or or turn off repeat
      } else if (currentPlayMode === PlayMode.repeat) {
        playMode = PlayMode.repeatOne;
      } else {
        // Shuffle is NOT active & we are turning repeat off
        playMode = PlayMode.normal;
      }
      // Repeat is off, we want to turn it on
    } else if (shuffleActive.value) {
      playMode = PlayMode.shuffleRepeat;
    } else {
      // Shuffle is NOT active & we are turning repeat on
      playMode = PlayMode.repeat;
    }

    const data = { groupId: activeZoneGroupId.value, update: { playMode } };

    updateZoneGroup(data);

    groupsAPI.playMode(activeZoneGroupId.value, playMode);
  }
}
</script>
