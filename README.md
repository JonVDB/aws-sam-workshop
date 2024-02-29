# AWS SAM Workshop
This workshop is intended to give a basic overview of AWS SAM and its functionalities.

## Requirements
- AWS CLI
- AWS SAM CLI
- Docker

## What is AWS SAM
AWS Serverless Application Model is a model which combines the development and architectural requirements of serverless applications. Developers can write application code and architecture-as-code into one and the same project, and deploy all-together to AWS.

### AWS SAM Command Line Interface
AWS SAM has a CLI which can be leveraged to validate, build, test locally and deploy. There are also other AWS SAM CLI commands available. See the documentation for more info.

### An abstraction layer on top of AWS CloudFormation
AWS SAM is also implemented on top of AWS CloudFormation. It forms an additional abstraction layer which is useful specifically when building serverless applications and architectures.

A `template.yaml` made for AWS SAM has the `Transform: AWS::Serverless-2016-10-31` at the top of the template file. During deployment, AWS SAM will transform and expand the SAM-syntax into AWS CloudFormation syntax before deploying the stack.

## Useful commands
### `sam validate`
This validates your template.yaml file.

### `sam build`
This will locally build your project.

### `sam local invoke`
This command will help you test your Lambda-functions locally after writing its code and configuring it in `template.yaml`. You can provide an event file (JSON-format) which will serve as the "input".
```
sam local invoke HelloWorldFunction --event .\events\test.json --profile <aws-cli-profile>
```
Any logging executed within the function will be printed to the console, as well as the output of the Lambda-function.

### `sam deploy`
This automatically packages and deploys your code and template to AWS. It creates an artifact which it uploads to an S3-bucket. This bucket can either be managed automatically by AWS SAM (auto-resolved), or it can be a bucket you have provided.
```
# Deploy template.yaml, resolve the S3 automatically and use the default config file (.\samconfig.toml)
sam deploy --resolve-s3 --profile <aws-cli-profile>

# Deploy template.yaml, resolve the S3 automatically and use a custom config file (.\config\tst.toml)
sam deploy --resolve-s3 --profile <aws-cli-profile> --config-file .\config\tst.toml
```

## `samconfig.toml`
You can provide a config file when executing any SAM command. By default, AWS SAM will look for a file named `samconfig.toml` in the root of the project. You can have multiple config files in a repository and use the CLI option to choose a specific one. This is useful when setting up different environments or when using pipelines.

### What to configure in config file?
Here are some common configuration options;
- `stack_name = "string"` for the name of the AWS CloudFormation stack
- `resolve_s3 = boolean` to choose whether AWS SAM should automatically create and manage an S3-bucket for artifacts
- `region = "<aws-region-name>"` the region where the stack should be deployed
- `confirm_changeset = boolean` to choose whether AWS SAM should ask for confirmation before deploying a stack after showing the changeset
- `parameter_overrides = "var1=val1 var2=val2"` parameters which will be passed to the `template.yaml` CloudFormation parameters when deploying


## Documentation
- AWS CLI: https://docs.aws.amazon.com/cli/
- AWS SAM: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
- SAM config: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html
