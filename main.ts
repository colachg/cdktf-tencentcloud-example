import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import {Vpc} from "./.gen/providers/tencentcloud/vpc";
import {TencentcloudProvider} from "./.gen/providers/tencentcloud/provider";

require('dotenv').config({ path: __dirname+'/.env' });
const { SECRETID,SECRETKEY,REGION } = process.env

export class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    // Tencent provider
    new TencentcloudProvider(this, `${REGION}`, {
      region: `${REGION}`,
      secretId: `${SECRETID}`,
      secretKey: `${SECRETKEY}`
    })

    // VPC configurations
    new Vpc(this, "vpc-1", {
      name: "vpc-1",
      cidrBlock: "192.168.1.0/24"
    })
  }
}

const app = new App();
new MyStack(app, "cdktf-tencent");
app.synth();
