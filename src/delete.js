import http from "k6/http";
import { check } from "k6";
import { BASE_URL } from "./helper/constant.js";

export const options = {
  vus: 10,
  duration: "10s",
};

export default function () {
  const response = http.del(`${BASE_URL}/users/2`);

  check(response, {
    "response status code must be 204": (res) => res.status === 204,
  });
}
