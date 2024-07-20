# simple-k6-testing

Simple performance testing example with k6

## Available Tests

This example uses [reqres.in](https://reqres.in/) as the sample application. These are the available tests.

| Filename        | Description       |
| --------------- | ----------------- |
| `src/get.js`    | Get all users     |
| `src/post.js`   | Create a new user |
| `src/put.js`    | Update an user    |
| `src/delete.js` | Delete an user    |

## Prerequisites

1. [NodeJS](https://nodejs.org/en)
2. [k6](https://k6.io/)

## How to Use

1. Clone this repository.

2. Install the dependencies.

```sh
npm install
```

3. Run the test based on the feature.

```sh
k6 run filename
```

For example, the get all user test is executed.

```sh
k6 run src/get.js
```

4. You can also try interactive mode when running the test.

```sh
npm test
```
