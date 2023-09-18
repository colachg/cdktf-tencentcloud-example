import "cdktf/lib/testing/adapters/jest";
import {App, Testing} from "cdktf";
import {MyStack} from "../main";

// require('dotenv').config({ path: __dirname+'/.env' });

// All Unit tests will test the synthesised terraform code, it does not create real-world resources
describe("My CDKTF Application", () => {
  let app:App
  let stack:MyStack;
  let synthesized: string;

  beforeAll(() => {
    app = Testing.app();
    stack = new MyStack(app, 'cdktf-tencent');
    synthesized = Testing.synth(stack);
  });

  describe('Checking validity', () => {
    it('should contain tencentcloud provider', () => {
      expect(Testing.toHaveProvider(synthesized, 'tencentcloud')).toBeTruthy();
    });

    it('check if the produced terraform configuration is valid', () => {
      expect(Testing.fullSynth(stack)).toBeValidTerraform();
      // expect(Testing.fullSynth(stack)).toPlanSuccessfully();
    });

    it('check if the produced terraform configuration is planing successfully', () => {
      expect(Testing.fullSynth(stack)).toPlanSuccessfully();
    });
  });


  // describe("Unit testing using assertions", () => {
  //   it("should contain a resource", () => {
  //     // import { Image,Container } from "./.gen/providers/docker"
  //     expect(
  //       Testing.synthScope((scope) => {
  //         new MyStack(scope, "my-app", {});
  //       })
  //     ).toHaveResource(Container);
  //
  //     expect(
  //       Testing.synthScope((scope) => {
  //         new MyStack(scope, "my-app", {});
  //       })
  //     ).toHaveResourceWithProperties(Image, { name: "ubuntu:latest" });
  //   });
  // });

  // describe("Unit testing using snapshots", () => {
  //   it("Tests the snapshot", () => {
  //     const app = Testing.app();
  //     const stack = new TerraformStack(app, "test");

  //     new TestProvider(stack, "provider", {
  //       accessKey: "1",
  //     });

  //     new TestResource(stack, "test", {
  //       name: "my-resource",
  //     });

  //     expect(Testing.synth(stack)).toMatchSnapshot();
  //   });

  //   it("Tests a combination of resources", () => {
  //     expect(
  //       Testing.synthScope((stack) => {
  //         new TestDataSource(stack, "test-data-source", {
  //           name: "foo",
  //         });

  //         new TestResource(stack, "test-resource", {
  //           name: "bar",
  //         });
  //       })
  //     ).toMatchInlineSnapshot();
  //   });
  // });

  // describe("Checking validity", () => {
  //   it("check if the produced terraform configuration is valid", () => {
  //     const app = Testing.app();
  //     const stack = new TerraformStack(app, "test");

  //     new TestDataSource(stack, "test-data-source", {
  //       name: "foo",
  //     });

  //     new TestResource(stack, "test-resource", {
  //       name: "bar",
  //     });
  //     expect(Testing.fullSynth(app)).toBeValidTerraform();
  //   });

  //   it("check if this can be planned", () => {
  //     const app = Testing.app();
  //     const stack = new TerraformStack(app, "test");

  //     new TestDataSource(stack, "test-data-source", {
  //       name: "foo",
  //     });

  //     new TestResource(stack, "test-resource", {
  //       name: "bar",
  //     });
  //     expect(Testing.fullSynth(app)).toPlanSuccessfully();
  //   });
  // });
});
