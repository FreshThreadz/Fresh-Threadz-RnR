import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [{ duration: '1m', target: 100 }]
};

const body = {
  product_id: 65633,
  rating: 5,
  date: 1663382601691,
  summary: 'NEXT REVIEW SET',
  body: 'body',
  recommend: true,
  name: 'name',
  email: 'email',
  photos: [{ url: 'testing1' }, { url: 'testing2' }],
  characteristics: {
    219374: 5,
    219375: 4,
  },
};

const BASE_URL = 'http://localhost:3000/reviews';

export default () => {
  http.batch([
    ['POST', BASE_URL, body],
  ]);

  sleep(1);
};
