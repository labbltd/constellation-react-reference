import { View } from "@labb/dx-engine";
import { GeneratePContainer } from "@labb/react-adapter";

export default function DxView(props: { container: View }) {
    const { container } = props;

    return <div className={`${container.pconnect.getComponentName().startsWith('Group') ? 'group' : ''} ${container.config.readOnly ? 'readOnly' : ''}`}>
        {container.config.httpMessages?.map((message: any) =>
            <div key={message.message}>
                {message.type}: {message.message}
            </div>
        )}
        {container.config.showHeading && <h2>{container.config.heading}</h2>}
        {(container.config.showLabel || container.config.hideLabel === false) && <h3>{container.config.label}</h3>}
        {(container.config.instructions && !['none', 'casestep'].includes(container.config.instructions)) && <div dangerouslySetInnerHTML={{ __html: container.config.instructions }}></div>}
        <div className="body">
            {props.container.children.map((child) => (
                <GeneratePContainer key={child.id} container={child} />
            ))}
        </div>
    </div>
}