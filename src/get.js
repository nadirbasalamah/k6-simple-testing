import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const response = http.get("https://reqres.in/api/users?page=2");

  check(response, {
    "response status code must be 200": (res) => res.status === 200,
    "response body data must not null": (res) => res.json().data !== null,
  });
}
