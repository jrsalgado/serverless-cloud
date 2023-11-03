import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'ApplicationPipeline', {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('jrsalgado/serverless-cloud', 'master'),
        commands: [ 'cd cdk-cicd', 'npm ci', 'npx cdk synth' ],
        primaryOutputDirectory: 'cdk-cicd/cdk.out'
      })
    })
  }
}
