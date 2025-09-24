import { ActionButton } from "@labb/constellation-core-types";
import { ModalViewContainer } from "@labb/dx-engine";
import { GeneratePContainer } from "@labb/react-adapter";
import { useRef, useState } from "react";

export default function DxModalViewContainer(props: { container: ModalViewContainer }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { container } = props;
    const dialog = useRef(null);

    async function buttonClick(button: ActionButton): Promise<void> {
        try {
            setErrorMessage(null);
            setLoading(true);
            await container.buttonClick(button);
        } catch (e) {
            const error = e as { message: string; type: string };
            setErrorMessage(error?.message || error?.type || 'Error');
        }
        setLoading(false);
    }

    return <dialog ref={dialog}>
        <h3>{container.heading}</h3>
        {props.container.children.map(child => (
            <GeneratePContainer key={child.id} container={child} />
        ))}
        {errorMessage && <div>{errorMessage}</div>}
        {container.actionButtons.secondary.map(button =>
            <button key={button.actionID}
                disabled={loading}
                onClick={() => buttonClick(button)}>
                {button.name}
            </button>
        )}
        {container.actionButtons.main.map(button =>
            <button key={button.actionID}
                disabled={loading}
                onClick={() => buttonClick(button)}>
                {button.name}
            </button>
        )}
    </dialog>
}