import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DefaultForm(props: { container: PContainer }) {
  const { container } = props;
  function getClassName() {
    let divClass = 'one-column';
    switch (container.config.NumCols ?? '1') {
      case '1':
        divClass = 'one-column';
        break;
      case '2':
        divClass = 'two-column';
        break;
      case '3':
        divClass = 'three-column';
        break;
      default:
        divClass = 'one-column';
        break;
    }
    return divClass
  }

  return <div className={getClassName()}>
    {props.container.children.map((child) => (
      <GeneratePContainer container={child} key={child.id} />
    ))}
  </div>
}
