import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs"

interface ServerlessStackProps extends StackProps{
    stageName?: string;
}

export class ServerlessStack extends Stack {
    constructor(scope: Construct, id: string, props: ServerlessStackProps) {
        super(scope, id, props)
    }
}