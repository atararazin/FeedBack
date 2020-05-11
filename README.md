# FeedBack

## About
I developed this web application from scratch using React, Redux, Node.js, and MongoDB. The app sends mass emails to a big list of users for the purpose of collecting feedback. 
It has the ability to login with Google and then view and create new surveys, or buy more credits to do that.
The app was developed in both developement and production environments, the production was deployed to Heroku.

## Run

In order to change the dir into the server
`cd..`
`npm run dev`
For the webhook to work (using ngrok):
`npx ngrok http 5000`
then you'll see "fowarding" and an address.
put that URL into sendgrid + 'api/surveys/webhooks'
in prod change it to the name of the app on heroku + 'api/surveys/webhooks'


## Acknowledgements
Built during the course Node with React: FullStack Web Developement - https://www.udemy.com/course/node-with-react-fullstack-web-development

