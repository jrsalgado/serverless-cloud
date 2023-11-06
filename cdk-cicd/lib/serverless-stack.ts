import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Vpc, SubnetType} from "aws-cdk-lib/aws-ec2";
import { EventBus, Rule, RuleTargetInput } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Construct } from "constructs"
import { join } from "path"
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";


interface ServerlessStackProps extends StackProps{
    stageName?: string;
}

export class ServerlessStack extends Stack {
    constructor(scope: Construct, id: string, props: ServerlessStackProps) {
        super(scope, id, props)
        // Create the VPC with public and private subnets and 2 AZ
        const vpc = new Vpc(this, 'vpc', {
            maxAzs: 2, // Set the number of Availability Zones
            subnetConfiguration: [
              {
                subnetType: SubnetType.PUBLIC,
                name: "PublicSubnet",
              },
              {
                subnetType: SubnetType.PRIVATE_WITH_EGRESS,
                name: "PrivateSubnet",
              },
            ],
        })

        const lambdaPurchases = new NodejsFunction(this, 'purchases', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: (join(__dirname, '../functions', 'purchases/src', 'index.ts')),
            vpc: vpc,
            vpcSubnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
            logRetention: RetentionDays.ONE_DAY, // Retain 1 day of logs,
        })

        const lambdaProductPicker = new NodejsFunction(this, 'product-picker', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: (join(__dirname, '../functions', 'product-picker/src', 'index.ts')),
            vpc: vpc,
            vpcSubnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
            logRetention: RetentionDays.ONE_DAY, // Retain 1 day of logs
        })

        // Create an EventBridge event bus named "32ds"
        const eventBus = new EventBus(this, "MyEventBus", {
            eventBusName: "32ds", // Set the name of the event bus
        });

        // Define the event pattern as an EventPattern object
        const eventPattern = {
            "source": ["32ds.purchases"],
            "detail-type": ["OrderPlacedEvent"],
        };

        // Create an event rule for the "OrderPlacedEvent"
        const eventRule = new Rule(this, "OrderPlacedEventRule", {
            eventBus,
            eventPattern,
            targets: [new LambdaFunction(lambdaProductPicker)]
        });

        const eventBridgePermission = new PolicyStatement({
            actions: ["events:PutEvents"],
            effect: Effect.ALLOW,
            resources: [ eventBus.eventBusArn],
        })

        lambdaPurchases.addToRolePolicy(eventBridgePermission);
    }
}