import * as aws from "@pulumi/aws";
import { VPC_CIDR,SUBNET_CIDR, VPC_TAGS } from "../constants";

export function createVpc() {
    const vpc = new aws.ec2.Vpc("webapp-vpc", {
        cidrBlock: VPC_CIDR,
        enableDnsSupport: true,
        enableDnsHostnames: true,
        tags: VPC_TAGS
    });

    const igw = new aws.ec2.InternetGateway("webapp-igw", {
        vpcId: vpc.id,
        tags: VPC_TAGS
    });

    const subnet = new aws.ec2.Subnet("webapp-subnet", {
        vpcId: vpc.id,
        cidrBlock: SUBNET_CIDR,
        mapPublicIpOnLaunch: true,
        tags: VPC_TAGS
    });

    const routeTable = new aws.ec2.RouteTable("webapp-route-table", {
        vpcId: vpc.id,
        routes: [{
            cidrBlock: "0.0.0.0/0",
            gatewayId: igw.id,
        }],
        tags: VPC_TAGS
    });

    new aws.ec2.RouteTableAssociation("webapp-rta", {
        subnetId: subnet.id,
        routeTableId: routeTable.id,
    });

    return { vpc, subnet };
}
