# Overview

Developed a Rest API for the Ratings and Reviews module for an existing e-commerce front-end application to extract data from

## Technologies Used

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

## Database

A sequel database gives the ability to improve our look up times by creating indexes in our tables. For an ecommerce website which has more heavy get-requests among other requests, we choose PostgreSQL to handle this job.

## Queries

Took the approach of using nested queries over individual queries to create my outputs. With the amount of potential get-requests in this application, having less calls to the database to get the data we need will less likely cause clogs in the servers or database.

```json
{
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
       }]
    }
  ]
}
```

## Deployment
Database and server were deployed to an AWS EC2 instance. Initially aiming for a goal of 1000 requests per second with (>50 ms) and (>1% error rate), one server could not even handle having 600 requests per second.

## Optimization
- Nginx was used to create a load balancer to host multiple servers and scale traffic of incoming requests
- This resulted in increased speed for requests per second and reduced error rate
  
<img width="1142" alt="1 Server" src="https://user-images.githubusercontent.com/107714292/192110362-0b9b9157-38a3-4c2d-b7d2-7616550eef3b.png">  

##### Two Servers #####
- With two servers, our backend application was now able to reach our goal of 1000 requests per second and got our error rate to 0%
- Pushing for greataer results, two servers alone could not handle over 1000 requests without crashing so we added a third

<img width="1097" alt="2 Servers 1000" src="https://user-images.githubusercontent.com/107714292/192110376-95a5e6ec-9389-48c9-a8a2-154c8fa6714a.png">

##### Three Servers #####
- A third server at 1000 was actually slower than two servers, but was able to help us reach 1200 requests per second with some error rate
- This was a trade-off to consider when trying to scale to handle more requests per second

<img width="1085" alt="3 Servers 1200" src="https://user-images.githubusercontent.com/107714292/192110379-cd913ebf-9af3-4045-b62e-61d0218a53a1.png">

##### Adding cache #####
- After adding caching to our Nginx, we were able to hit up to 5000 requests per second and peaking at 7000.

<img width="1062" alt="Cache 5000 Reviews" src="https://user-images.githubusercontent.com/107714292/192110384-c38cf9c4-cb2f-452d-a095-acc2eda02c6f.png">
