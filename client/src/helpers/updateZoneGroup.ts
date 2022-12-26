import appStore from "@/store";
import { IZoneGroups } from "@/types/IStore";

export default function updateZoneGroup(data: IZoneGroups) {
  // find the group that this data belongs to
  const index = appStore.global.zoneGroups.findIndex((group: IZoneGroups) => {
    return group.id === data.groupId;
  });
  // Merge the zoneGroup with new data
  appStore.global.zoneGroups[index] = { ...appStore.global.zoneGroups[index], ...data.update };
}
