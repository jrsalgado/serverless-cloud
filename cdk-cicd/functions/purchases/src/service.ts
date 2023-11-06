import { PlaceOrderCommand, validatePayment } from "./domain";
import { EventBridgeMessageBus } from "./messaging";

export function placeOrder(command: PlaceOrderCommand) {
    const event = validatePayment(command.userId, command.numberOfProducts)
    const messageBus = new EventBridgeMessageBus()
    return messageBus.publish(event)
}
