import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 500 },
    { duration: '5m', target: 500 },
    { duration: '2m', target: 1000 },
    { duration: '5m', target: 1000 },
    { duration: '10m', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<50']
  }
};

const BASE_URL = 'http://localhost:3000/reviews';

export default () => {
  http.batch([
    ['GET', `${BASE_URL}?product_id=${1}&count=50&page=1`],
    ['GET', `${BASE_URL}?product_id=${500000}&count=50&page=1`],
    ['GET', `${BASE_URL}?product_id=${999999}&count=50&page=1`],
  ]);

  sleep(1);
};
