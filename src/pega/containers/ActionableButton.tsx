import { PContainer } from "@labb/dx-engine";

export default function DxActionableButton(props: { container: PContainer }) {
    const { container } = props;

    function performAction() {
        container.pconnect
            .getActionsApi()
            .openLocalAction(container.config.localAction, {
                caseID: container.config.value,
                containerName: 'modal',
                type: 'express'
            });
    }

    return <div>
        <button type="button" onClick={() => performAction()}>{container.config.label}</button>
    </div>
}