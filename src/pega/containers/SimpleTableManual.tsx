import { SimpleTableManual } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DxSimpleTableManual(props: { container: SimpleTableManual }) {
  const { container } = props;
  return <>
    {container.config.label && <h3>{container.config.label}</h3>}

    <table>
      <thead>
        <tr>
          {container.fieldDefs.map(col => <th key={col.name}>{col.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {(container.readOnlyMode || container.allowEditingInModal) &&
          container.rowData.map((row, index) => <tr key={index}>
            {
              container.processedFields.map(col =>
                <td key={col.config.name} dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></td>
              )
            }
          </tr>)
        }
        {(container.editableMode && !container.allowEditingInModal) &&
          (container.elementsData || []).map((row, rowIndex) =>
            <tr key={rowIndex}>
              {row.map((col, colIndex) => <td key={colIndex}><GeneratePContainer container={col} /></td>)}
            </tr>
          )}
      </tbody>
    </table>
    {container.config.allowActions?.allowAdd && <button type="button" onClick={() => container.addRow()}>Add Row</button>}
  </>
}
