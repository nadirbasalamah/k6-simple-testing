import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const response = http.del("https://reqres.in/api/users/2");

  check(response, {
    "response status code must be 204": (res) => res.status === 204,
  });
}
