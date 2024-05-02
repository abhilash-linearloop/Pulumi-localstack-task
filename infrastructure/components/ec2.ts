import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { EC2_TAGS, EC2_INSTANCE_TYPE, AMI_ID } from "../constants"


const userData =
    `
    #!/bin/bash
    apt-get update
    apt-get install curl
    apt-get install nginx -y
    systemctl start nginx
    systemctl enable nginx
    mkdir /var/www/html/
    git clone https://github.com/jeffersonRibeiro/react-shopping-cart
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    source ~/.bashrc
    nvm install 14.17.3
    nvm use 14.17.3
    cd react-shopping-cart
    npm install
    npm run build
    cp -r build/* /var/www/html/
    rm -rf build
    systemctl restart nginx
    echo "Done!"
    `;

export function createEc2Instance(subnetId: pulumi.Input<string>, securityGroupId: pulumi.Input<string>) {

    const instance = new aws.ec2.Instance("webapp-instance", {
        ami: AMI_ID,
        instanceType: EC2_INSTANCE_TYPE,
        subnetId: subnetId,
        associatePublicIpAddress: true,
        vpcSecurityGroupIds: [securityGroupId],
        userData: userData,
        tags: EC2_TAGS
    });

    return instance;
}
