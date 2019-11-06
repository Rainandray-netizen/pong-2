# Pong 2: Dark Reunion

An epic pong game of good vs evil using SVGs.

## Setup

Ensure you have [Node.js](https://nodejs.org/en/) installed first.

**Install dependencies:**

`$ npm install`

**Run locally with the Parcel dev server:**

`$ npm start`

Once you run the start command you can access your project at http://localhost:3000.

Read more about the [Parcel web application bundler here](https://parceljs.org/).

## Deploy

The deployment workflow for this project will be a bit different from what you've used when deploying simple static websites.

To deploy your finished Pong project as a GitHub page, you must first **update the `predeploy` script in the `package.json` file with the name of your repo.**

For example, if your repo URL is:

https://github.com/bob/pong-project

Update the `predeploy` script as follows:

```json
"predeploy": "rm -rf dist && parcel build index.html --public-url /pong-project",
```

Once you have done this, you can run:

`$ npm run deploy`

Now check out your deployed site 🙂

## Technologies Used

+ HTML
+ CSS
+ Javascript

## Personal Learnings

This project was my first real foray into javascript.  I learned to import partials and use them elsewhere in my code. I also learned to create and properly use svgs and loops.

### Authors
Ryan Adrian - Contributed the HTML, CSS, and Javascript
RED Academy - Created the pong starter
