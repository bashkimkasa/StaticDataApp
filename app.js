var express = require('express')
    , app = express()
    , port = process.env.PORT || 8082
    , router = express.Router()
    , inputData = require('./data.js')
    , express_graphql = require('express-graphql')
    , { buildSchema } = require('graphql');

// Static Data to work with (stored in data.js file)
var data = inputData;

/**************************************************/
/*************** GraphQL section ******************/
/**************************************************/

// GraphQL Schema
var schema = buildSchema(`

type Query {
  users(userId: String): [User]
  user(userId: String!): User
  subscriptions(subscriptionId: String): [Subscription]
  subscription(subscriptionId: String!): Subscription
}

type Subscription {
  subscriptionId: String!
  productId: String!
  country: String
  companyName: String
  status: String
  plans: [Plan]
  memberships: [Membership]

}
type Plan {
  planId: String
}
type User {
  userId: String!
  username: String!
  displayName: String
  firstName: String
  lastName: String
  status: String!
  memberships: [Membership]
}
type Membership {
  user: User
  subscription: Subscription
  roles: [String]
}
`);

// Classes to help with nested relationships for GraphQL
class User {
  constructor({...rest}) {
    Object.assign(this, rest);
  }

  memberships() {
    return data.memberships
      .filter(membership => membership.userId === this.userId)
      .map(membership => new Membership(membership));
  }
}

class Subscription {
  constructor({...rest}) {
    Object.assign(this, rest);
  }

  memberships() {
    return data.memberships
      .filter(membership => membership.subscriptionId === this.subscriptionId)
      .map(membership => new Membership(membership)) ;
  }
}

class Membership {
  constructor({...rest}) {
    Object.assign(this, rest);
  }

  user() {
    return new User(data.users.find(user => user.userId === this.userId )); 
  }

  subscription() {
    return new Subscription(data.subscriptions
      .find(subscription => subscription.subscriptionId === this.subscriptionId));    
  }
}

// Root resolver
var root = {
  users({ userId }) {
    if (!userId)
      return data.users.map(user => new User(user));
    else {
      return data.users
        .filter(user => user.userId === userId)
        .map(user => new User(user));
    }
  },
  user({ userId }) {
    return new User(data.users.find(user => user.userId === userId ));
  },
  subscriptions({ subscriptionId }) {
    if (!subscriptionId)
      return data.subscriptions.map(subscription => new Subscription(subscription));
    else {
      return data.subscriptions
        .filter(subscription => subscription.subscriptionId === subscriptionId)
        .map(subscription => new Subscription(subscription));
    }
  },
  subscription({ subscriptionId }) {
    return new Subscription(data.subscriptions
      .find(subscription => subscription.subscriptionId === subscriptionId));
  }
}

// Create  a GraphQL endpoint
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

/**************************************************/
/***************** REST section *******************/
/**************************************************/

// Helper Functions for REST endpoints
// getUsers with filter (userId)
var getUsers = function(args) {
  if (args.userId) {
      var userId = args.userId;
      return data.users.filter(user => user.userId === userId);
  } else {
      return data.users;
  }
}

// getSubscriptions with filter (subscriptionId)
var getSubscriptions = function(args) {
  if (args.subscriptionId) {
      var subscriptionId = args.subscriptionId;
      return data.subscriptions.filter(subscription => subscription.subscriptionId === subscriptionId);
  } else {
      return data.subscriptions;
  }
}

var getUserSubscriptionMemberships = function(args) {
  var userId = args.userId;
  return data.memberships.filter(membership => membership.userId === userId);
}

var getSubscriptionUsersMemberships = function(args) {
  var subscriptionId = args.subscriptionId;
  return data.memberships.filter(membership => membership.subscriptionId === subscriptionId);
}

// Routes
router.get('/', function(req, res) {
  res.redirect("/info");
})


router.get('/info', function(req, res) {
  res.json({message: "This App is a test for GraphQL"});
})

router.get('/users', function(req, res) {
  var args = { userId: req.query.userId };
  var result = getUsers(args);
  res.json(result);
})

router.get('/users/:userId', function(req, res) {
  var args = { userId: req.params.userId };
  var result = getUsers(args);
  if (result && result.length > 0)
    res.json(result[0]);
  else
    res.status(404).json({error: 'User not found'});
})

router.get('/users/:userId/memberships', function(req, res) {
  var args = { userId: req.params.userId };
  var result = getUsers(args);
  if (result && result.length > 0)
    {
      var result = getUserSubscriptionMemberships(args);
      res.json(result);
    }
  else
    res.status(404).json({error: 'User not found'});
})

router.get('/subscriptions', function(req, res) {
  var args = { subscriptionId: req.query.subscriptionId };
  var results = getSubscriptions(args);
  res.json(results);
})

router.get('/subscriptions/:subscriptionId/memberships', function(req, res) {
  var args = { subscriptionId: req.params.subscriptionId };
  var result = getSubscriptions(args);
  if (result && result.length > 0)
    {
      var result = getSubscriptionUsersMemberships(args);
      res.json(result);
    }
  else
    res.status(404).json({error: 'Subscription not found'});
})

router.get('/subscriptions/:subscriptionId', function(req, res) {
  var args = { subscriptionId: req.params.subscriptionId };
  var result = getSubscriptions(args);
  if (result && result.length > 0)
    res.json(result[0]);
  else
    res.status(404).json({error: 'Subscription not found'});
})

app.use('/', router);

module.exports = app;

app.listen(port, function() {
  console.log('Listening on port ' + port)
})
