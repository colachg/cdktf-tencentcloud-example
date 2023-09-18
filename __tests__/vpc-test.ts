import {App, Testing} from "cdktf";
import {MyStack} from "../main";
import {Vpc} from "../.gen/providers/tencentcloud/vpc";
import "cdktf/lib/testing/adapters/jest";


let app:App
let stack:MyStack;
let synthesized: string;

beforeAll(() => {
    app = Testing.app();
    stack = new MyStack(app, 'cdktf-tencent');
    synthesized = Testing.synth(stack);
});

// Test vpc create
describe("Test vpc", ()=> {
    it.only('should contain a vpc config', () => {
        expect(synthesized).toHaveResource(Vpc)
        expect(synthesized).toHaveResourceWithProperties(Vpc, {
            cidr_block: "192.168.1.0/24",
            name: "vpc-1"
        })
    });
})
