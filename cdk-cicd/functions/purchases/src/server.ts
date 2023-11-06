import { Request, Response } from 'express';
import * as express from 'express';
import { PlaceOrderCommand } from './domain';
import { placeOrder } from './service';

const app = express()
app.use(express.json())
const port = 8080

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to 32DollarSurprise')
})

app.post('/new', (req: Request, res: Response) => {
    const command = new PlaceOrderCommand(req.body.userId, req.body.numberOfProducts)
    placeOrder(command)
    console.log("Order Placed Successfully.")
    res.sendStatus(200)
})

app.listen(port, ()=> {
    console.log(`Purchases service listening on port ${port}`)
})
