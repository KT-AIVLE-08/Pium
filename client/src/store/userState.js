import { atom } from "recoil";

import { AUTHOR } from "utils/constants";

export const userState = atom({
  key: "userState",
  default: {
    author: AUTHOR.ANONYMOUS,
    user_id: -1,
    school_id: -1,
  },
});

export const resultState = atom({
  key: "resultState",
  default: [],
});

export const consentState = atom({
  key: "consentState",
  default: {
    personal: false,
    policy: false,
  }
})
