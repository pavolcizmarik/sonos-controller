import axios from "axios";

export default function (baseURL: string) {
  return axios.create({
    baseURL,
  });
}
