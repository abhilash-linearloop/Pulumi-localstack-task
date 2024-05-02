import { createVpc } from "./components/vpc";
import { createEc2Instance } from "./components/ec2";
import { createSecurityGroup } from "./components/security-group";



const { subnet,vpc } = createVpc();
const securityGroupId = createSecurityGroup(vpc.id);
const instance = createEc2Instance(subnet.id,securityGroupId.id);

export const publicIp = instance.publicIp;
