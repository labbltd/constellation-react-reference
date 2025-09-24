import { PContainer } from "@labb/dx-engine";
import { ChangeEvent } from "react";

export default function DxTextArea(props: { container: PContainer }) {
    const { container } = props;

    function getValue(event: ChangeEvent): string {
        return (event.target as HTMLInputElement).value;
    }
    if (props.container.config.readOnly) {
        return <><dt>{props.container.config.label}</dt><dd dangerouslySetInnerHTML={{ __html: props.container.config.value }}></dd></>;
    }
    return <>
        <label htmlFor={props.container.id}>
            {props.container.config.label}
            {props.container.config.required ? ' *' : ''}
            {props.container.config.helperText && <span data-tooltip={props.container.config.helperText}>?</span>}
        </label>
        {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
        <textarea
            id={container.id}
            value={container.config.value}
            rows={10}
            onChange={e => container.updateFieldValue(getValue(e))}
            onBlur={e => container.triggerFieldChange(getValue(e))}
        ></textarea>
    </>
}