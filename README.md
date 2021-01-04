# google-api-middleware
google-api-middleware

google-api-middleware server is build to create AuthToken 
and fetch google contact details from google SDK.


if client app want to fetch contact details, it should follow below steps.

1. Call the `social-app/google/authToken` end-point to create JWT accessToken
    by passing auth details which returned from google-sign-in(OAuth) api.
2. On above end-point, The JWT accessToken is created from detail(google-access-token, user-name, email & google-refresh token).
3. Call the `/social-app/google/people/list` end-point to fetch contact details by passing JWT accessToken returned by `authToken` end-point.

google-api-middleware service port & JWT secret are configure
from ENV variable. It takes default value if env variable not available.

# Api document
get api document by hitting below end-point 
 `http://localhost:8080/api-docs/#/` 
 
Node version : v10.23.0
Yarn version : 1.12.1

Note: i have attached swagger document screenshot on screenshot folder.

#Install dependency
run `yarn install`

#run application
run `yarn dev` 
 

  
