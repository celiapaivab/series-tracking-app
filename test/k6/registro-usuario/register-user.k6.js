import http from "k6/http";
import { check, sleep } from "k6";
import { BASE_URL } from "../base.config.js";

export const options = {
  vus: 30,
  duration: "60s",
  thresholds: {
    http_req_duration: ["p(95)<200"],
  },
};

function generateUniqueEmail() {
  const timestamp = Date.now() + Math.floor(Math.random() * 10000);
  return `testuser+${timestamp}@example.com`;
}

export default function () {
  const payload = JSON.stringify({
    email: generateUniqueEmail(),
    password: "SenhaValida123",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(`${BASE_URL}/register`, payload, params);

  check(res, {
    "status is 201": (r) => r.status === 201,
    "response time < 200ms": (r) => r.timings.duration < 200,
    "body has success message": (r) =>
      r.json("message") === "Usuário registrado com sucesso",
  });

  sleep(1);
}
