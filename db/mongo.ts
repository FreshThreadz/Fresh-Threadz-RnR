// import { Schema, model, connect } from 'mongoose';

// interface IReviews {
//   review_id: number;
//   product_id: number;
//   rating: number;
//   summary: string;
//   recommend: boolean;
//   respone: string;
//   body: string;
//   date: string;
//   reviewer_name: string;
//   helpfulness: number;
//   email: string;
// }

// const reviewsSchema = new Schema<IReviews>({
//   review_id: Number,
//   product_id: Number,
//   rating: Number,
//   summary: String,
//   recommend: Boolean,
//   respone: String,
//   body: String,
//   date: String,
//   reviewer_name: String,
//   helpfulness: Number,
//   email: String
// })

// const Reviews = model<IReviews>('Reviews', reviewsSchema);

// interface IChar_review {
//   char_id: number;
//   review_id: number;
//   name: string;
//   value: number;
// }

// const char_reviewSchema = new Schema<IChar_review>({
//   char_id: Number,
//   review_id: Number,
//   name: String,
//   value: Number,
// })

// const Char_Reviews = model<IChar_review>('Char_Reviews', char_reviewSchema);

// interface IPhotos {
//   url: string;
//   review_id: number;
// }

// const photosSchema = new Schema<IPhotos>({
//   url: String,
//   review_id: Number
// })

// const Photos = model<IPhotos>('Photos', photosSchema);


// async function run() {
//   await connect(`mongodb://localhost/${process.env.DB_NAME}`)
// }

// PORT = 3000

// DB_USER = "brianpham"
// DB_PASS = ""
// DB_NAME = "rnr"
// DB_HOST = "localhost"