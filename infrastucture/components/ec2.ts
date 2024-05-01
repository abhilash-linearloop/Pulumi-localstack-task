import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { EC2_TAGS, EC2_INSTANCE_TYPE, AMI_ID } from "../constants"


const userData =
    `
    #!/bin/bash
    apt-get update
    apt-get install nginx -y
    echo "Testing Nginx UserData" > /var/www/html/index.html
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
