import { SimpleTable } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DxSimpleTable(props: { container: SimpleTable }) {
  return <>
    {props.container.children.map(child => (
      <GeneratePContainer key={child.id} container={child} />
    ))}
    {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
    {props.container.config.multiRecordDisplayAs === 'fieldGroup' && <button type="button"
      onClick={() => props.container.addFieldGroupItem()}>
      Add {props.container.config.targetClassLabel}
    </button>}
  </>
}
