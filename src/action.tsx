import classnames from "classnames";
import * as React from "react";
import { Context as StepperContext } from "./context";

const ALIGN_LEFT = "left";
const ALIGN_RIGHT = "right";

type Align = "left" | "right";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  raised?: boolean;
    skipped?: boolean;
  align?: Align;
}

const StepperAction: React.FunctionComponent<Props> = ({
  disabled = false,
  skipped = false,
  raised = false,
  type,
  align = ALIGN_LEFT,
  className,
  children,
  ...props
}) => {
  const { isLoading } = React.useContext(StepperContext);

  return (
    <button
      {...props}
      type={type}
      disabled={isLoading() || disabled || skipped}
      className={classnames("mdc-button", "stepper__action", className, {
        "mdc-button--raised": raised,
        "mdc-button--unelevated": type === "submit",
        "mdc-button-align--left": align === ALIGN_LEFT,
        "mdc-button-align--right": align === ALIGN_RIGHT
      })}
    >
      <span className="mdc-button__label">{children}</span>
    </button>
  );
};

export default StepperAction;
