import http from "k6/http";
import {
  describe,
  expect,
} from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";

export const options = {
  vus: 10,
  duration: "10s",
};

export default function () {
  describe("Update a user", () => {
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

    const timestampPattern =
      /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?([Zz]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?/;
    const jsonResponse = response.json();

    expect(response.status, "response status code").to.equal(200);
    expect(jsonResponse, "response body data").to.not.equal(null);
    expect(jsonResponse.name, "username").to.not.equal(null);
    expect(jsonResponse.job, "job").to.not.equal(null);
    expect(jsonResponse.updatedAt, "updatedAt").to.match(timestampPattern);
  });
}
