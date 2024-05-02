import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

// AWS EC2 Instance Types
export const EC2_INSTANCE_TYPE = "t3a.small";

// Tags for all resources
export const COMMON_TAGS = {
    Project: "Pulumi",
    Environment: "Development"
};

// Resource-specific tags
export const VPC_TAGS = { ...COMMON_TAGS, Resource: "VPC", Name: "LocalStack-VPC" };
export const EC2_TAGS = { ...COMMON_TAGS, Resource: "EC2", Name: "LocalStack-EC2"};


// Fetch AMI
const stack = pulumi.getStack();

let AMI_ID: pulumi.Input<string>;

if (stack === "localstack") {
    AMI_ID = "ami-0f09ed56128e994fe"; // This is your TEMP_ID
} else {
    // Dynamically fetch the latest AMI ID for non-test stacks
    AMI_ID = aws.ec2.getAmi({
        mostRecent: true,
        filters: [
            {
                name: "name",
                values: ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"],
            },
            {
                name: "virtualization-type",
                values: ["hvm"],
            },
        ],
        owners: ["099720109477"], // Ubuntu's owner ID for the official AMIs
    }).then(ami => ami.id);
}

export { AMI_ID };


// VPC
export const VPC_CIDR = "192.168.0.0/16";
export const SUBNET_CIDR = "192.168.0.0/24";