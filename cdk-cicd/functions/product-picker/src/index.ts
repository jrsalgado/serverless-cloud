import { Handler} from "aws-lambda";
import { createOrderDescription } from "./domain";
import { OrderPlacedEvent } from "./domain";

export const handler: Handler = async (event, context) => {
    console.log(JSON.stringify(event))
    const domainEvent = new OrderPlacedEvent(
        event.detail.id, event.detail.numberOfProducts
    )
    const orderDescription = createOrderDescription(domainEvent)
    console.log(`Order ${orderDescription.orderId} includes ${orderDescription.products}`)
}