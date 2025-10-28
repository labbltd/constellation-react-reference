import { PicklistProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';

export default function DxRadioButtons(props: { container: PContainer<PicklistProps> }) {
  function getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement).value;
  }

  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return (
    <fieldset>
      <legend>
        {props.container.config.label}
        {props.container.config.required ? ' *' : ''}
      </legend>
      <i>{props.container.config.helperText}</i>
      {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
      {props.container.config.datasource.map(
        (option: { key: string; value: string }) => <label key={option.key}>
          <input
            type="radio"
            onChange={(e) => {
              props.container.updateFieldValue(getValue(e.target));
              props.container.triggerFieldChange(getValue(e.target));
            }}
            checked={props.container.config.value === option.key}
            name={props.container.id}
            id={`${props.container.id}.${option.key}`}
            value={option.key}
          />{' '}
          {option.value}
        </label>
      )}
    </fieldset>
  );
}
