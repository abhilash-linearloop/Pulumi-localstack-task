# Pulumi-localstack-task



install pulumi
[choco install pulumi](https://www.pulumi.com/docs/install/)

node 18

pulumi up
pulumi login
pulumi logout
pulumi destroy


python 3.9.8
pip install pulumi-local


python (Python 3.7 up to 3.11 is supported)
python -m pip install --upgrade localstack
docker needed


pulumi stack init test --copy-config-from localstack


### Prerequisites
Before you start, ensure you have the following installed:

- Node.js and npm [For running react-shopping-cart app]
- Docker
- Docker Compose
- AWS CLI
- Pulumi
- LocalStack

## Installation

- #### AWS CLI
    - Follow this link [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and set up AWS CLI on your machine.
    - Configure AWS CLI using this link [AWSCLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
    - Once setup is done, Install Pulumi and LocalStack

- #### Pulumi

    - Click on this link [Pulumi](https://www.pulumi.com/docs/install/) and follow the instructions to set up Pulumi in your machine

- #### LocalStack
  
    - Need Docker to run LocalStack in your machine.
    - It is ideal to install LocalStack by following this [link](https://docs.localstack.cloud/getting-started/installation/).
    - Using LocalStack via Docker is the simplest way to run LocalStack on your machine
    - Run the below command to set up the LocalStack [NOTE:- The Only Drawback is it does not store state of LocalStack in docker we can do that via docker-compose]
      ```
          docker run  --rm -it  -p 4566:4566  -p 4510-4559:4510-4559 --name localstack localstack/localstack
      ```
    - OR you can use docker-compose to run the LocalStack on your machine. 
      ```
          cd infrastructure/localstack
          docker compose up -d
          docker compose logs -f
      ```
    - For using `localstack` commands use the below command
      ```
          docker exec -it localstack /bin/bash
      ```
      and then you can use `awslocal` command

    - For testing out a resource list you can use the below command [NOTE:- Run the below command after running localstack pulumi stack]
      ```
          awslocal ec2 describe-instances --region us-east-2
      ```

- - - -

## Deployment

- #### Deploying Infra using Pulumi to AWS

    1. Clone project [Repo link](https://github.com/abhilash-linearloop/Pulumi-localstack-task.git)
    2. Assuming the above installation steps are completed. Follow the  below instructions
        ```
        cd Pulumi-localstack-task/infrastructure
        pulumi up
        ```
    3. The above commands will provision required infrastructure for hosting react-shopping-cart app
