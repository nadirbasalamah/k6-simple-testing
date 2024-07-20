import http from "k6/http";
import {
  describe,
  expect,
} from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";
import { BASE_URL } from "./helper/constant.js";

export const options = {
  vus: 10,
  duration: "10s",
};

export default function () {
  describe("Get all users", () => {
    const response = http.get(`${BASE_URL}/users?page=2`);
    const jsonResponse = response.json();

    expect(response.status, "response status code").to.equal(200);
    expect(jsonResponse.data, "response body data").to.not.equal(null);
    expect(jsonResponse.page, "response page field").to.be.a("number");
    expect(jsonResponse.per_page, "response per_page field").to.be.a("number");
    expect(jsonResponse.total, "response total field").to.be.a("number");
    expect(jsonResponse.total_pages, "response total_pages field").to.be.a(
      "number"
    );
    expect(jsonResponse.data, "response body data").to.be.an("Array");
  });
}
