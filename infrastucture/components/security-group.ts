import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { EC2_TAGS } from "../constants"

export function createSecurityGroup(vpcId: pulumi.Input<string>) {
    const group = new aws.ec2.SecurityGroup("webapp-secgrp", {
        vpcId: vpcId,
        ingress: [
            { protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },
            { protocol: "tcp", fromPort: 80, toPort: 80, cidrBlocks: ["0.0.0.0/0"] },
            { protocol: "tcp", fromPort: 443, toPort: 443, cidrBlocks: ["0.0.0.0/0"] }
        ],
        egress: [{ protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"] }],
        tags: EC2_TAGS
    });
    return group;
}