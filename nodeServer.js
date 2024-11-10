const http = require("http");
const { paymentClient } = require("./client");

const host = "localhost";
const port = 8000;

const requestListener = function (req, res) {
  const url = req.url.split("/");
  const method = req.method;

  switch (method) {
    case "GET":
      if (url[1] === "payments") {
        if (url.length > 2 && url[2]) {
          paymentClient.GetPayment(
            {
              payment_id: url[2],
            },
            (error, payment) => {
              if (error) {
                res.writeHead(500);
                res.end(error.message);
                return;
              }
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(payment));
            }
          );
        } else {
          paymentClient.ListPayments({}, (error, response) => {
            if (error) {
              res.writeHead(500);
              res.end(error.message);
              return;
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response.payments));
          });
        }
      }
      break;
    case "POST":
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const paymentData = JSON.parse(body);
        paymentClient.CreatePayment(
          {
            user_id: paymentData.user_id,
            amount: paymentData.amount,
            currency: paymentData.currency,
            method: paymentData.method,
          },
          (error, response) => {
            if (error) {
              res.writeHead(500);
              res.end(error.message);
              return;
            }
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                payment_id: response.payment_id,
                message: response.message,
              })
            );
          }
        );
      });
      break;
    case "PUT":
      let updateBody = "";
      req.on("data", (chunk) => {
        updateBody += chunk.toString();
      });
      req.on("end", () => {
        const paymentData = JSON.parse(updateBody);
        paymentClient.EditPayment(
          {
            payment_id: url[2],
            user_id: paymentData.user_id,
            amount: paymentData.amount,
            currency: paymentData.currency,
            method: paymentData.method,
          },
          (error, response) => {
            if (error) {
              res.writeHead(500);
              res.end(error.message);
              return;
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response));
          }
        );
      });
      break;
    case "DELETE":
      paymentClient.DeletePayment(
        {
          payment_id: url[2],
        },
        (error, response) => {
          if (error) {
            res.writeHead(500);
            res.end(error.message);
            return;
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ message: "Successfully deleted a payment." })
          );
        }
      );
      break;
    default:
      res.writeHead(404);
      res.end("Not Found");
      break;
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
