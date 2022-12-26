import { global } from "./global";

const appStore: any = {};

export const registerStore = () => {
  appStore.global = global();
};

export default appStore;
