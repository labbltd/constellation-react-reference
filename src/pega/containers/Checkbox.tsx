import { CheckboxProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';

export default function Checkbox(props: {
  container: PContainer<CheckboxProps>;
}): JSX.Element {
  function getValue(target: EventTarget & HTMLInputElement): boolean {
    return target.checked;
  }

  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.caption}</dt><dd>{props.container.config.value ? props.container.config.trueLabel : props.container.config.falseLabel}</dd></>;
  }

  return <>
    <label>
      <span>
        <input
          type="checkbox"
          checked={props.container.config.value ?? false}
          onChange={(e) => {
            props.container.updateFieldValue(getValue(e.target));
            props.container.triggerFieldChange(getValue(e.target));
          }}
        />
        {props.container.config.caption}
        {props.container.config.required ? ' *' : ''}
      </span>
      {props.container.config.helperText && <span data-tooltip={props.container.config.helperText}>(?)</span>}
    </label>
    {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
  </>;
}
