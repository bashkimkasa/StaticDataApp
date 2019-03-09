# StaticDataApp

This is a sample nodejs app to show functionality for GraphQL with static data in the app

## Minimum Prerequisites

* npm
* nodejs

## Setup / Build

Download the app and go to the folder/directory where app.js file exist and run the following command:

```
npm install
```

## Run

To run the app go to the folder/directory where app.js file exist and run the following command:

```
npm start
```

The server will start on port 8082.  
   
  
## Usage and Examples

* Open your favorite browser and go to this page to verify the app is working:  
  http://localhost:8082

* Here are the REST endpoints (test data available in data.js):
    ```
    List all users:                  http://localhost:8082/users
    Get single user:                 http://localhost:8082/users/{userId}
    Get user memberships:            http://localhost:8082/users/{userId}/memberships

    List all subscriptions:          http://localhost:8082/subscriptions
    Get single subscription:         http://localhost:8082/subscriptions/{subscriptionId}
    Get subscription memberships:    http://localhost:8082/subscriptions/{subscriptionId}/memberships
    ```
  
* Here is the GraphQL endpoint and example queries you can do from this endpoint:  
  http://localhost:8082/graphql
  
	```
    Example query - list all users (only profile info): 
    query {
      users {
        userId
        username
        displayName
        firstName
        lastName
        status
      }
    }
	```
	```
    Example query - list all users filter/query by userid (only profile info):
    query {
      users(userId: "user1") {
        userId
        username
        displayName
        firstName
        lastName
        status
      }
    }
	```
	```
    Example query - list all users filter/query by userid and return memberships:
    query {
      users(userId: "user1") {
        userId
        username
        displayName
        firstName
        lastName
        status
        memberships {
          subscription {
            subscriptionId
            productId
            country
            companyName
            status
            plans {
              planId
            } 
          }
          roles
        }
      }
    }
	```
	```
    Example query - list all subscriptions filter/query by subscriptionId and return memberships:
    query {
      subscriptions(subscriptionId: "subscription1") {
        subscriptionId
        productId
        country
        companyName
        status
        plans {
          planId
        }
        memberships {
          user {
            userId
            username
            displayName
            firstName
            lastName
            status
          }
          roles
        }
      }
    }
	```
	```
    Example query - get user and its subscription memberships (by userId)
    query {
      user(userId: "user1") {
        userId
        username
        displayName
        firstName
        lastName
        status
        memberships {
          subscription {
            subscriptionId
            productId
            country
            companyName
            status
            plans {
              planId
            } 
          }
          roles
        }
      }
    }
	```
	```
    Example query - get subscription and its user memberships (by subscriptionId)
    query {
      subscription(subscriptionId: "subscription1") {
        subscriptionId
        productId
        country
        companyName
        status
        plans {
          planId
        }
        memberships {
          user {
            userId
            username
            displayName
            firstName
            lastName
            status
          }
        }
      }
    }	
	```
