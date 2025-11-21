import { Dropdown } from '@labb/dx-engine';
import { useEffect, useState } from 'react';

export default function DxAutocomplete(props: {
  container: Dropdown;
}): JSX.Element {
  const [items, setItems] = useState<{ key: string, value: string }[]>([]);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setOptions();
  }, [])

  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }

  async function setOptions() {
    if (items.length === 0) {
      const name = (props.container.config.fieldMetadata as any)?.datasource?.name || props.container.config.datasource;
      if (name) {
        console.log(props.container.config.fieldMetadata)
        const parameters = (props.container.config.fieldMetadata as any)?.datasource?.parameters || [];
        const dataPageParams = parameters.reduce((acc: any, param: any) => ({
          ...acc,
          [param.name]: param.value
        }), {} as { [key: string]: string });
        const response = await window.PCore.getDataApiUtils().getData<{ pyLocalizedValue: string, pyFieldValue: string }>(name, { dataViewParameters: dataPageParams });
        if (response.data?.data) {
          const cols = props.container.config.columns;
          if (cols) {
            const items = response.data.data.map((item: { [key: string]: string }) => ({
              value: item[cols.find(col => col.display === 'true').value.replace('\.', '')],
              key: item[cols.find(col => col.key === 'true').value.replace('\.', '')]
            }))
            setItems(items);
          } else {
            const items = response.data.data.map(item => ({
              value: item.pyLocalizedValue,
              key: item.pyFieldValue
            }))
            setItems(items);
          }
          const matchedItem = items.find(item => item.value === value)?.value;
          if (matchedItem) {
            setValue(matchedItem);
          }
        }
      }
    }
  }

  function matches(item: string, search: string) {
    const normalizedItem = item.trim().toLowerCase();
    const normalizedSearch = search.trim().toLowerCase();
    return normalizedSearch.split('').reduce((idx, letter) =>
      idx === -1 ? idx : normalizedItem.split('').indexOf(letter, idx == -2 ? 0 : idx + 1),
      -2
    ) >= 0;
  }

  return (
    <div>
      <label htmlFor={props.container.id}>
        {props.container.config.label}
        {props.container.config.required ? ' *' : ''}
        {props.container.config.helperText && <span data-tooltip={props.container.config.helperText}>?</span>}
      </label>
      {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
      <select
        id={props.container.id}
        onChange={(e) => {
          props.container.updateFieldValue(e.target.value);
          props.container.triggerFieldChange(e.target.value);
        }}
        disabled={props.container.config.disabled}
        value={props.container.config.value}
      >
        <option value="" disabled={props.container.config.required}>
          Select...
        </option>
        {items?.map((option, idx) => (
          <option key={idx + option.key!} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}
