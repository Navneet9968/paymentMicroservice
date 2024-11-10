const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./payment.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const paymentProto = grpc.loadPackageDefinition(packageDefinition).payment;

const server = new grpc.Server();
let payments = [
  {
    payment_id: "1",
    user_id: "user123",
    amount: 100.0,
    currency: "USD",
    method: "credit_card",
    status: "created",
  },
  {
    payment_id: "2",
    user_id: "user456",
    amount: 200.0,
    currency: "EUR",
    method: "paypal",
    status: "created",
  },
];

server.addService(paymentProto.PaymentService.service, {
  CreatePayment: (call, callback) => {
    const payment = {
      payment_id: Date.now().toString(),
      ...call.request,
      status: "created",
    };
    payments.push(payment);
    callback(null, {
      payment_id: payment.payment_id,
      message: "Payment created successfully",
    });
  },
  GetPayment: (call, callback) => {
    const payment = payments.find(
      (p) => p.payment_id === call.request.payment_id
    );
    if (!payment) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Payment not found",
      });
    }
    callback(null, payment);
  },
  ListPayments: (_, callback) => {
    callback(null, { payments });
  },
  DeletePayment: (call, callback) => {
    payments = payments.filter((p) => p.payment_id !== call.request.payment_id);
    callback(null, {});
  },
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);
