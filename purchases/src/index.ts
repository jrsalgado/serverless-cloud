import { Handler} from "aws-lambda";
import { PlaceOrderCommand } from './domain';
import { placeOrder } from './service';

export const handler: Handler = async (event) => {
    const requestBody = JSON.parse(event.body)
    console.log(requestBody)
    const command = new PlaceOrderCommand(requestBody.userId, requestBody.numberOfProducts)
    placeOrder(command)
    console.log("Order Placed Successfully.")

    const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json", // Set the response content type
        },
        body: JSON.stringify({ message: "Order Placed Successfully." }), // Convert a JavaScript object to a JSON string
      };

    return response;
}