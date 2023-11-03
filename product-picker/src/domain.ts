import { nouns, adjectives } from "./words"

export class OrderPlacedEvent {
    constructor(
        public orderId: string,
        public numberOfProducts: number
    ) {}
}

function sampleFromArray<T>(arr: Array<T>): T {
    return arr[Math.floor(Math.random() * arr.length)]
  }

function buildName(): string {
    const adjective = sampleFromArray(adjectives)
    const noun = sampleFromArray(nouns)
    return  `${adjective}-${noun}`
}

function chooseProducts(numberOfProducts: number): string[]{
    let products = []
    for (let i=0; i < numberOfProducts; i++) {
        products[i] = buildName()
    }
    return products
}

class OrderDescription{
    constructor(
        public orderId: string,
        public products: string[]
    ){}
}

export function createOrderDescription(event: OrderPlacedEvent): OrderDescription {
    return new OrderDescription(
        event.orderId,
        chooseProducts(event.numberOfProducts)
    )
}
