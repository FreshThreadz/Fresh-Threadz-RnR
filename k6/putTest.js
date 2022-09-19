import http from 'k6/http';
import { sleep } from 'k6';


export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [{ duration: '1m', target: 100 }],
};

const BASE_URL = 'http://localhost:3000/reviews';

export default () => {
  http.batch([
    ['PUT', `${BASE_URL}/1/helpful`],
    ['PUT', `${BASE_URL}/250000/helpful`],
    ['PUT', `${BASE_URL}/500000/helpful`]
  ]);

  sleep(1);
};
