# How to run

After clonning the git repo, you should run `npm install` in both **backened** and **frontend** directories.

I'm using **CoinAPI** to collect exchange data. Tha api key is in `.env` file as `COIN_API_KEY`. I'm leaving my free acount api key here. However, you may start to recieve `exceeded limit...` errors. So, you can change the key with yours.

No specific configuration is needed. You can run `npm run dev` inside backend & frontend directories. While backend runs on `http://localhost:4000`, frontend runs on `http://localhost:3000`

You can check backend in `http://localhost:4000/graphql`. GraphQL playground should be displayed with our GraphQl schema. If every goes well so far, you can see the main page in `http://localhost:3000`.

## Building & running Docker images

Under frontend & backend directories you can run `docker build . -t frontend` & `docker build . -t backend` respectively.
After both Docker build succeeds, you can run `docker-compose up` in the root directory.

# Tech Stack

node version : 16.14.2
npm version : 7.23.0

## MongoDB

I used MongoDB Atlas. I kept `MONGODB_CONNECTION` in `.env` file of backend. For data modelling Mongoose is used.

## GraphQL Backend

I created the GraphQL backend with Apollo Server on Expressjs

## Next.js Frontend

In my opinion, Next.js is a wonderful choice for developing production ready React.js applications. I used its latest version `"12.1.5"`

## React.js Component Styling

Next.js supports CSS modules out of the box. So, instead of of using any UI kit, I sticked with CSS modules.

## Long live GraphQL Code Generator!

Since GraphQL is a very opiniated type environment, somehow we need to generate those client side types based on GraphQL schema. **GraphQL Code Generator** shines here...

## Warning!

I realized that apollo cache in SSR mode in server side did is not updated after first query even though we use `fetch-policy:"network-only"`. Client side behaviour has no problem.
I'm working on this, will push an update when solved it...

# About React.js components

I followed **element -> component ->...-> component -> page** approach. Where the atomic components are grouped as elements. Components are composed of elements or other components.

You can watch my [short video](https://drive.google.com/file/d/1nHtbFhcM_T8PLrWNZLNHzUHUoD5HZFR6/view?usp=sharing)

Thank you 😎
