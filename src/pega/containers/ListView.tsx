import { ListView } from '@labb/dx-engine';

export default function DxListView(props: { container: ListView }) {
  const { container } = props;
  return <>
    <label htmlFor={props.container.id}>
      {props.container.config.label}
      {props.container.config.required ? ' *' : ''}
      {props.container.config.helperText && <span data-tooltip={props.container.config.helperText}>?</span>}
    </label>
    {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
    <table>
      <thead>
        <tr>
          {(container.singleSelectionMode || container.multiSelectionMode) && <th>Select</th>}
          {container.fields.map(col => <th key={col.config.label}>{col.config.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {container.updatedRefList.map(row =>
          <tr key={row.id}>
            {container.singleSelectionMode &&
              <td>
                <input type="radio"
                  name={container.id}
                  value={row[container.rowID]}
                  checked={row[container.rowID] === container.config.value}
                  onChange={() => container.selectRow(row)} />
              </td>
            }
            {container.multiSelectionMode &&
              <td>
                <input type="checkbox"
                  name={container.id}
                  value={row[container.rowID]}
                  checked={row[container.rowID] === container.config.value}
                  onChange={e => container.selectRow(row, e.target.checked)} />
              </td>
            }
            {container.fields.map(col => container.showButton(col.config.name, col) ?
              <td key={col.config.name}>
                <a type="button" href="#"
                  onClick={(e) => {e.preventDefault(); container.listViewClick(col.config, row)}}
                  dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}/>
              </td> :
              <td key={col.config.name} dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  </>
}
