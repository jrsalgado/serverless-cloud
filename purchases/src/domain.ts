import { v4 as uuid } from 'uuid'; 

export class PlaceOrderCommand {
    constructor(
        public userId: number,
        public numberOfProducts: number
    ) {}
}

export class OrderPlacedEvent {
    constructor(
    public id: string,
    public userId: number,
    public numberOfProducts: number) {}
}

export function validatePayment(userId: number, numberOfProducts: number) {
    const orderId = uuid();
    return new OrderPlacedEvent(orderId, userId, numberOfProducts);
}
