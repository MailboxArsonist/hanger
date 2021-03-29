# Welcome to hanger, a simple react app that tracks you hangboard workouts progress.

Steps to setup project


1. Make sure you have an aws user with lambda(development mode on) and dynamodb set up.
2. Install serverless locally and setup your AWS creds [help](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/)
3. Run `sls deploy` to deploy to aws
4. cd back to the root dir and cd into the hanger-webapp directory. Here you can run yarn install then yarn start to start the development locally.
5. You'll also need to create a config.json inside the /src dir to put the base url of you aws api, it should look like this:
```
{
    "API_URI": "https://yourapi.execute-api.us-east-1.amazonaws.com/dev/"
}
```
6. head to localhost:3000 and your app should be up and running. 

You can create a user by simply entering an email (email is stored as a cookie so you dont need to log back in, theres no email validation so you don't need to put a real email in here.)

Once you've signed in you'll be redirected to the app, you can create a workout, view the workout, edit it and 'start'.

If you click on start it will create a 'history' for this workout which should appear in your history list.


#improvements

1. Add some real user auth/session, I just wanted something super simple to get up and running
2. make it look nice
3. add error handling, especially with the api calls
4. Code in the create/edit workout could be a bit more dry
5. add real validation, both client/server 
6. I used dynamoDB to try something new but realistically using a relational db probably would have been better here, especially the scan for the email when logging in.
7. refact the reducers for api calls to be more dry (I wanted to use these for better error handling/loading)
8. add some redirection to anything /app and fetch data if refreshing on one of these pages (currently you can refresh on /app as the cookie is set, but I'd like to get round to fetching the correct data for each view)
9. add client / api keys for security purposes

