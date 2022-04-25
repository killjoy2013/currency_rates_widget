## How to run

After clonning the git repo, you should run `npm install` in both **backened** and **frontend** directories.

I'm using **CoinAPI** to collect exchange data. Tha api key is in `.env` file as `COIN_API_KEY`. I'm leaving my free acount api key here. However, you may start to recieve `exceeded limit...` errors. So, you can change the key with yours.

No specific configuration is needed. You can run `npm run dev` inside backend & frontend directories. While backend runs on `http://localhost:4000`, frontend runs on `http://localhost:3000`

You can check backend in `http://localhost:4000/graphql`. GraphQL playground should be displayed with our GraphQl schema

![playground](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i7j8vj6e1r0lgxjnxfqs.PNG)

Main page of the application must be seen like below;

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/va8v4rxnqggy9lzbq22w.PNG)

## Building & running Docker images

Under frontend & backend directories you can run `docker build . -t frontend` & `docker build . -t backend` respectively.
After both Docker build succeeds, you can run `docker-compose up` in the root directory.

I'll add a short video showing the usage of application in a couple of hours...

Thank you 😎
