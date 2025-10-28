import { FieldGroupListItemProps, PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DxFieldGroupListItem(props: { container: PContainer<FieldGroupListItemProps> }) {
  return <>
    {props.container.config.allowDelete &&
      <button type="button"
        style={{ height: '100%' }}
        onClick={() => props.container.config.deleteFieldGroupItem()}>
        x
      </button>
    }
    {props.container.config.label && <strong>{props.container.config.label}</strong>}
    {props.container.children.map(child => (
      <GeneratePContainer key={child.id} container={child} />
    ))}
  </>
}
