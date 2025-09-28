import { RootContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DxRootContainer(props: { container: RootContainer }) {
  return <>
    {props.container.config.httpMessages?.map(message =>
      message.type === 'error' ? <em key={message.message}>
        {message.message}
      </em> : <div>{message.message}</div>
    )}
    {props.container.children.map(child => (
      <GeneratePContainer key={child.id} container={child} />
    ))}
  </>
}
