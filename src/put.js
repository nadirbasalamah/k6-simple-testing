import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const requestBody = {
    name: "morpheus",
    job: "leader",
  };

  const response = http.put(
    "https://reqres.in/api/users/2",
    JSON.stringify(requestBody),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  check(response, {
    "response status code must be 200": (res) => res.status === 200,
    "response body data must not null": (res) => res.json() !== null,
  });
}
