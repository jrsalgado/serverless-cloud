import { Handler} from "aws-lambda";
import { PlaceOrderCommand } from './domain';
import { placeOrder } from './service';

export const handler: Handler = async (event) => {
  try {
    console.log(event);
    const requestBody = JSON.parse(event.body)
    console.log(requestBody)
    const command = new PlaceOrderCommand(requestBody.userId, requestBody.numberOfProducts)
    const resultEvent = await placeOrder(command)
    console.log(resultEvent)
    console.log("Order Placed Successfully.")

    const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json", // Set the response content type
        },
        body: JSON.stringify({ message: "Order Placed Successfully." }), // Convert a JavaScript object to a JSON string
      };

    return response;

  } catch (error) {
    console.error("Error placing order:", error);

    // Return a 500 status code for errors
    const errorResponse = {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Error placing order", error: error.message }),
    };
    return errorResponse;
  }
}