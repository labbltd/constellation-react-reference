import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DxFieldGroupListItem(props: { container: PContainer }) {
  return <>
    {props.container.config.label && <strong>{props.container.config.label}</strong>}
    {props.container.children.map(child => (
      <GeneratePContainer key={child.id} container={child} />
    ))}
  </>
}
