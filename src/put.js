import http from "k6/http";
import { SharedArray } from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import {
  describe,
  expect,
} from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";
import { getRandomUser } from "./helper/random.js";

const csvData = new SharedArray("sample user dataset", () => {
  return papaparse.parse(open("../resources/users.csv"), { header: true }).data;
});

export const options = {
  vus: 10,
  duration: "10s",
};

export default function () {
  describe("Update a user", () => {
    const sampleUser = getRandomUser(csvData);

    const requestBody = {
      name: sampleUser.username,
      job: sampleUser.job,
    };

    console.log("req: ", requestBody);

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

    console.log(jsonResponse);

    expect(response.status, "response status code").to.equal(200);
    expect(jsonResponse, "response body data").to.not.equal(null);
    expect(jsonResponse.name, "username").to.not.equal(null);
    expect(jsonResponse.job, "job").to.not.equal(null);
    expect(jsonResponse.updatedAt, "updatedAt").to.match(timestampPattern);
  });
}
