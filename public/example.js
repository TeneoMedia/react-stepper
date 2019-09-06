import * as React from "react";
import Stepper, { Step } from "../src";
// import './public/react-stepper.css';
// import '../style.css';

const StepperExample = () => (
  <Stepper>
    <Step
      stepId={1}
      data="Step 1 initial state"
      title="Step One"
      description="This step is optional"
    />
    <Step stepId={2} title="Step Two" description="Name is required" skipped/>
    <Step stepId={3} title="Step Three" />
  </Stepper>
);

export default StepperExample;
