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

  const response = http.post(
    "https://reqres.in/api/users",
    JSON.stringify(requestBody),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  check(response, {
    "response status code must be 201": (res) => res.status === 201,
    "response body data must not null": (res) => res.json() !== null,
    "response body must contain valid id": (res) => res.json().id !== 0,
  });
}
