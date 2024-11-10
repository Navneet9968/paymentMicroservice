const { paymentClient, authClient } = require("./client");

// Create a payment
paymentClient.CreatePayment(
  {
    user_id: "user123",
    amount: 100.0,
    currency: "USD",
    method: "credit_card",
  },
  (error, response) => {
    if (error) {
      console.error("Error: ", error);
      return;
    }
    console.log("Successfully created a payment: ", response.payment_id);
  }
);

// Get a payment
paymentClient.GetPayment(
  {
    payment_id: "1",
  },
  (error, response) => {
    if (error) {
      console.error("Error: ", error);
      return;
    }
    console.log("Payment details: ", response);
  }
);

// List all payments
paymentClient.ListPayments({}, (error, response) => {
  if (error) {
    console.error("Error: ", error);
    return;
  }
  console.log("All payments: ", response.payments);
});

// Delete a payment
paymentClient.DeletePayment(
  {
    payment_id: "1",
  },
  (error, response) => {
    if (error) {
      console.error("Error: ", error);
      return;
    }
    console.log("Successfully deleted a payment.");
  }
);
