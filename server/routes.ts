import { Router} from 'express';
export const router = Router();
import { getReviews, getMeta, postReviews, helpful, report } from './models';

router.get('/', async(req ,res) => {
  let product_id = Number(req.query.product_id);
  let page = Number(req.query.page) || 1;
  let count = Number(req.query.count) || 5;

  let sort: any = req.query.sort
    if (req.query.sort === 'newest') {
      sort = req.query.sort;

    } else if (req.query.sort === 'helpful') {
      sort = req.query.sort;

    } else {
      sort = 'relevant';
    }

  const reviews = await getReviews(
    product_id,
    page,
    count,
    sort
  );

  res.send({
    product_id: product_id.toString(),
    page: page - 1,
    count: count,
    results: reviews
  })
  .status(200)

  console.log('Reviews successfully fetched');
})

router.get('/meta', async (req, res) => {
  let product_id = Number(req.query.product_id);
  const meta = await getMeta(product_id);
  res.send({
    product_id: product_id.toString(),
    ...meta
  })
  .status(200)

  console.log('Meta data successfully fetched');
})


router.post('/', async (req, res) => {
  const review_id = await postReviews(req.body);
  res.sendStatus(201)
  console.log(`Review successfully posted, review_id: ${review_id}`);
})

router.put('/:review_id/helpful', async (req, res) => {
  const review_id = Number(req.params.review_id);
  await helpful(review_id);
  res.sendStatus(204)
  console.log(`Review successfully updated (helpfulness), id: ${review_id}`);
})

router.put('/:review_id/report', async (req, res) => {
  const review_id = Number(req.params.review_id);
  await report(review_id);
  res.sendStatus(204)
  console.log(`Review successfully reported, id: ${review_id}`);
})

