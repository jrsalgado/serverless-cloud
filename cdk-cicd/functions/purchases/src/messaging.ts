import { OrderPlacedEvent } from './domain';
import { EventBridgeClient, PutEventsCommand, PutEventsCommandInput } from '@aws-sdk/client-eventbridge';

interface MessageBus {
    publish(event: OrderPlacedEvent): void
}

export class LogMessageBus implements MessageBus{
    publish(event: OrderPlacedEvent) {
        console.log(JSON.stringify(event))
    }
}
export class EventBridgeMessageBus implements MessageBus{
    public client: EventBridgeClient

    constructor(){
        this.client = new EventBridgeClient({"region": "us-west-1"});
    }

    createInput(event: OrderPlacedEvent): PutEventsCommandInput {
        return {
            Entries: [{
                Detail: JSON.stringify(event),
                DetailType: "OrderPlacedEvent",
                EventBusName: "32ds",
                Source: "32ds.purchases"
            }]
        }
    }

    async publish(event: OrderPlacedEvent) {
        const input = this.createInput(event)
        const command = new PutEventsCommand(input)
        const response = await this.client.send(command)
        console.log(JSON.stringify(response))
        return response
    }
}
