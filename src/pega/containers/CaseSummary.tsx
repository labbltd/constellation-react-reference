import { PContainer } from "@labb/dx-engine";
import { GeneratePContainer } from "@labb/react-adapter";
import { useState } from "react";

export default function DxCaseSummary(props: { container: PContainer }) {
    const [showSummary, setShowSummary] = useState(false);
    const { container } = props;
    return <>
        <a role="button" onClick={() => setShowSummary(!showSummary)}>
            <h3>
                <span>Show Case Details</span>
            </h3>
        </a>
        {showSummary &&
            <div role="region">
                {container.children.map(child => <GeneratePContainer key={child.id} container={child} />)}
            </div>
        }
    </>
}