import { Dropdown } from '@labb/dx-engine';

export default function DxDropdown(props: { container: Dropdown }) {
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return <div>
    <label htmlFor={props.container.id}>
      {props.container.config.label}
      {props.container.config.required ? ' *' : ''}
      {props.container.config.helperText && <span data-tooltip={props.container.config.helperText}>?</span>}
    </label>
    {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
    <select
      onChange={(e) => props.container.updateFieldValue(e.target.value)}
      onBlur={(e) => props.container.triggerFieldChange(e.target.value)}
      disabled={props.container.config.disabled}
      value={props.container.config.value}
    >
      <option value="" disabled={props.container.config.required}>
        Select...
      </option>
      {props.container.listItems?.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  </div>
}
