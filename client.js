const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const paymentProtoPath = "./payment.proto";
const authProtoPath = "auth-microservice-main/proto_def/auth.proto"; // Updated path

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

// Load PaymentService
const paymentPackageDefinition = protoLoader.loadSync(
  paymentProtoPath,
  options
);
const paymentProto = grpc.loadPackageDefinition(
  paymentPackageDefinition
).payment;

const paymentClient = new paymentProto.PaymentService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Load AuthService
const authPackageDefinition = protoLoader.loadSync(authProtoPath, options);
const authProto = grpc.loadPackageDefinition(authPackageDefinition).auth;

const authClient = new authProto.AuthService(
  "localhost:50052", // Assuming auth service runs on a different port
  grpc.credentials.createInsecure()
);

module.exports = { paymentClient, authClient };
