import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs"
import { join } from "path"

interface ServerlessStackProps extends StackProps{
    stageName?: string;
}

export class ServerlessStack extends Stack {
    constructor(scope: Construct, id: string, props: ServerlessStackProps) {
        super(scope, id, props)

        new NodejsFunction(this, 'product-picker', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: (join(__dirname, '../..', 'product-picker/src', 'index.ts'))
        })
    }
}