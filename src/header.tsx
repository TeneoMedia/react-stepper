import classnames from "classnames";
import * as React from "react";
import doneIcon from "../icons/baseline-done-24px.svg";
import warningIcon from "../icons/baseline-warning-24px.svg";
import skippedIcon from "../icons/remove.svg";
import { Context } from "./context";
import Svg from "./svg";
import { StepId } from "./typings";

interface Props {
  index: number;
  stepId: StepId;
}

const CLASS_NAME = "stepper__head";

const Header: React.FunctionComponent<Props> = ({ index, stepId }) => {
  const { isLoading, goAt, getStep, getCurrentStep } = React.useContext(
    Context
  );
  const current = getCurrentStep();
  const {
    loading,
    completed,
    skipped,
    error,
    disabled,
    description,
    className,
    title
  } = getStep(stepId);

  const active = Boolean(current && current.stepId === stepId);
  const disabled$ =
    disabled || skipped || isLoading() || !Boolean(active || completed || error);

  const onClick = () => goAt(stepId);

  return (
    <button
      tabIndex={index}
      disabled={disabled$}
      onClick={onClick}
      className={classnames(className, CLASS_NAME, {
        [`${CLASS_NAME}--loading`]: loading,
        [`${CLASS_NAME}--completed`]: completed,
        [`${CLASS_NAME}--skipped`]: skipped,
        [`${CLASS_NAME}--error`]: error,
        [`${CLASS_NAME}--active`]: active,
        [`${CLASS_NAME}--disabled`]: disabled$
      })}
    >
      <span className={`${CLASS_NAME}__index`}>
        {error && (
          <Svg className={`${CLASS_NAME}__icon`} content={warningIcon} />
        )}
        {!error && completed && !skipped && (
          <Svg className={`${CLASS_NAME}__icon`} content={doneIcon} />
        )}
        {!error && skipped && (
          <Svg className={`${CLASS_NAME}__icon`} content={skippedIcon} />
        )}
        {!error && !completed && !skipped && index}
      </span>
      <span className={`${CLASS_NAME}__title`}>
        {error ? error.msg : title}
        {error && error.description && (
          <span className={`${CLASS_NAME}__description`}>{error.description}</span>
        )}
        {!error && description && (
          <span className={`${CLASS_NAME}__description`}>{description}</span>
        )}
      </span>
    </button>
  );
};

export default React.memo(Header);
