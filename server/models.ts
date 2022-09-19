import { pool } from '../db/postgres';

interface Submit {
  product_id: number;
  rating: number;
  summary: string;
  body: string;
  recommend: boolean;
  name: string;
  email: string;
  photos: Array<Photo_Info>;
  characteristics: any;
}

interface Photo_Info {
  url: string;
}

export async function getReviews(
  product_id: number,
  page: number,
  count: number,
  sort: string
): Promise<any> {
  try {

    page = (page - 1) * count
    let sortQuery;
    if (sort === 'newest') {
      sortQuery = 'date DESC'

    } else if (sort === 'helpful') {
      sortQuery = 'helpfulness DESC'

    } else {
      sortQuery = 'date DESC, helpfulness DESC'
    }

    const query =
`SELECT id::integer AS review_id,
      rating,
      summary,
      recommend,
      response,
      body,
      (TO_TIMESTAMP(date / 1000)) AS date,
      reviewer_name,
      helpfulness,
      COALESCE(
  (SELECT json_agg(json_build_object('id', id,'url', url))
  FROM
      (SELECT id,
        url
      FROM reviews_photos
      WHERE review_id = reviews.id) pictures), '[]'::json) AS photos
    FROM reviews
WHERE product_id = $1
        AND reported = FALSE
ORDER BY ${sortQuery} LIMIT $2 OFFSET $3`;

    const select = await pool.query(query, [product_id, count, page]);
    return select.rows;

  } catch (err) {
    console.log(err)
  }
}

export async function getMeta(product_id: number) {
  try {
    const query =
`SELECT
  (SELECT json_object_agg( rating,
          count ) AS ratings
  FROM
      (SELECT rating,
        COUNT(rating) AS count
      FROM reviews
      WHERE product_id = $1
      GROUP BY   rating) ratings ),
      (SELECT json_object_agg( recommend,
        count ) AS recommended
      FROM
        (SELECT recommend,
      COUNT(recommend) AS count
        FROM reviews
        WHERE product_id = $1
        GROUP BY recommend) reccomended ),
        (SELECT json_object_agg( name,
      json_build_object( 'id', id, 'value', value ) ) AS characteristics
        FROM
            (SELECT char.name AS name,
      char.id AS id,
      AVG(characteristics_reviews.value)::text AS value
            FROM characteristics char
            INNER JOIN characteristics_reviews
                ON char.id = characteristics_reviews.characteristic_id
            WHERE char.product_id = $1
            GROUP BY char.id) characteristics)`;

    const select = await pool.query(query, [product_id]);
    return select.rows[0];
  } catch (err) {
    console.log(err)
  }
}

export async function postReviews(body: Submit) {
  try {

    const date = Date.now();
    const values = [
      body.product_id,
      body.rating,
      date,
      body.summary,
      body.body,
      body.recommend,
      body.name,
      body.email,
    ];

    const query =
`INSERT INTO reviews ( product_id, rating, date, summary, body, recommend,
reviewer_name, reviewer_email )
VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 )
RETURNING id`;

    let review_id:any = await pool.query(query, values);
    review_id = Number(review_id.rows[0].id);

    //INSERTING PHOTO
    if (body.photos && body.photos.length > 0) {
      const photoQuery =
  `INSERT INTO reviews_photos ( review_id, url )
    SELECT $1, unnest($2::text[])`;

      await pool.query(photoQuery, [review_id, body.photos]);

    //INSERTING CHARACTERISTICS
    if (Object.keys(body.characteristics).length > 0) {
      const charQuery =
  `INSERT INTO characteristics_reviews ( review_id, characteristic_id, value )
    SELECT $1, key::bigint, value::int
    FROM ( SELECT * FROM json_each_text($2) ) char`;

      await pool.query(charQuery, [review_id, body.characteristics]);
      return review_id;
    }
    }
  } catch (err) {
    console.log(err)
  }
}

export async function helpful(review_id: number) {
  try {
    const query = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1`;

    await pool.query(query, [review_id])
    return;

  } catch (err) {
    console.log(err)
  }
}

export async function report(review_id: number) {
  try {
    const query = `UPDATE reviews SET reported = TRUE WHERE id = $1`;

    await pool.query(query, [review_id]);
    return;
  } catch (err) {
    console.log(err)
  }
}
