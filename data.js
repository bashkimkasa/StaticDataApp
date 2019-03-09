var data = {
  users: [
    {
      userId: "user1",
      username: "user1@test.com",
      displayName: "Test User 1",
      firstName: "Test",
      lastName: "User 1",
      status: "ACTIVE"
    },
    {
      userId: "user2",
      username: "user2@test.com",
      displayName: "Test User 2",
      firstName: "Test",
      lastName: "User 2",
      status: "STAGED"
    },
    {
      userId: "user3",
      username: "user3@test.com",
      displayName: "Test User 3",
      firstName: "Test",
      lastName: "User 3",
      status: "ACTIVE"      
    }
  ],
  subscriptions: [
    {
      subscriptionId: "subscription1",
      productId: "product1",
      country: "US",
      companyName: "company 1",
      status: "ACTIVE",
      plans: [
        {
          planId: "plan1"
        },
        {
          planId: "plan2"
        }
      ]
    },
    {
      subscriptionId: "subscription2",
      productId: "product2",
      country: "US",
      companyName: "company 2",
      status: "ACTIVE",
      plans: [
        {
          planId: "plan2"
        }
      ]
    },
    {
      subscriptionId: "subscription3",
      productId: "product3",
      country: "US",
      companyName: "company 3",
      status: "ACTIVE",
      plans: [
        {
          planId: "plan1"
        }
      ]
    }        
  ],
  memberships: [
    {
      userId: "user1",
      subscriptionId: "subscription1",
      roles: ["Admin", "Manager"]
    },
    {
      userId: "user1",
      subscriptionId: "subscription2",
      roles: ["Admin"]
    },
    {
      userId: "user1",
      subscriptionId: "subscription3",
      roles: ["User"]
    },
    {
      userId: "user2",
      subscriptionId: "subscription1",
      roles: ["Admin"]
    },
    {
      userId: "user2",
      subscriptionId: "subscription2",
      roles: ["Admin", "Manager"]
    },
    {
      userId: "user3",
      subscriptionId: "subscription3",
      roles: ["Admin"]
    }
  ]
}

module.exports = data;