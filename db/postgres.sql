DROP DATABASE IF EXISTS rnr;
CREATE DATABASE rnr;
\c rnr

CREATE TABLE reviews (
  id bigserial PRIMARY KEY,
  product_id bigint NOT NULL,
  rating int NOT NULL,
  date bigint NOT NULL,
  summary text NOT NULL,
  body text NOT NULL,
  recommend boolean DEFAULT FALSE,
  reported boolean DEFAULT FALSE,
  reviewer_name text NOT NULL,
  reviewer_email text NOT NULL,
  response text,
  helpfulness int DEFAULT 0
);

CREATE TABLE reviews_photos (
  id bigserial PRIMARY KEY,
  review_id bigint REFERENCES reviews(id),
  url text NOT NULL
);

CREATE TABLE characteristics (
  id bigserial PRIMARY KEY,
  product_id bigint NOT NULL,
  name text NOT NULL
);

CREATE TABLE characteristics_reviews (
  id bigserial PRIMARY KEY,
  characteristic_id bigint REFERENCES characteristics(id),
  review_id bigint REFERENCES reviews(id),
  value int NOT NULL
);

\copy reviews FROM '/Users/brianpham/Desktop/Documents/hackreactor/rfp2207-SDC-Superman-RnR/db/cvs/reviews.csv' WITH (FORMAT CSV, HEADER);

\copy reviews_photos FROM '/Users/brianpham/Desktop/Documents/hackreactor/rfp2207-SDC-Superman-RnR/db/cvs/reviews_photos.csv' WITH (FORMAT CSV, HEADER);

\copy characteristics FROM '/Users/brianpham/Desktop/Documents/hackreactor/rfp2207-SDC-Superman-RnR/db/cvs/characteristics.csv' WITH (FORMAT CSV, HEADER);

\copy characteristics_reviews FROM '/Users/brianpham/Desktop/Documents/hackreactor/rfp2207-SDC-Superman-RnR/db/cvs/characteristic_reviews.csv' WITH (FORMAT CSV, HEADER);


SELECT setval(pg_get_serial_sequence('reviews', 'id'), COALESCE(max(id),0) + 1,false) FROM reviews;

SELECT setval(pg_get_serial_sequence('reviews_photos', 'id'), COALESCE(max(id),0) + 1,false) FROM reviews_photos;

SELECT setval(pg_get_serial_sequence('characteristics_reviews', 'id'), COALESCE(max(id),0) + 1,false) FROM characteristics_reviews;

CREATE INDEX reviews_product on reviews (product_id);

CREATE INDEX char_product on characteristics (product_id);

CREATE INDEX review_photo ON reviews_photos (review_id);

CREATE INDEX char_id ON characteristics_reviews (characteristic_id);

CREATE INDEX helpful_sort ON reviews (helpfulness DESC);

CREATE INDEX date_sort ON reviews (date DESC);