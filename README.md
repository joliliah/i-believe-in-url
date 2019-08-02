# In the famous words of Dolly Parton: "I Believe In URL"

## I Believe In URL is an app that is able to transform big, ugly URLs into a short, sweet string of unique characters. It is also able to show aggregated data regarding URL usage statistics. 


### Files:

#### Models
1. User
    1. Stores standard user information, hashes a clear password and stores only the hash in the database. 
    1. Generates and verifies JWTs
1. URL
    1. References the user that uploaded it
    1. Stores both the original URL and the shortened URL
1. Hit
    1. Is created simultaneously with each URL visit
    1. Stores location data, along with a creation/update timestamp
    1. Aggregates most-visited sites, and data regarding the users, their location, and what time the hits are occurring. 


#### Routes
1. Auth
    1. Create a new user
    1. Log in a previously-created user
    1. Verify user authentication to provide gated access to site features and functionality.
1. Urls
    1. Signed-in user is able to upload any URL and store it in the database
1. Hits
    1. Show the top ten posts by hit count 
    1. Show location and hit data of any URL


### Technologies used:

#### Main stack:
1. Node.js
1. Express
1. Mongodb
1. Mongoose

#### Testing
1. Jest
1. Supertest/Superagent

#### Misc.
1. Bcryptjs
1. Chance
1. Geoip-lite
