import { PContainer } from "@labb/dx-engine";
import { ChangeEvent, useEffect, useRef } from "react";
import IMask from 'imask';

export default function DxMaskedInput(props: { container: PContainer }) {
    const input = useRef(null);
    const { container } = props;

    useEffect(() => {
        if (input.current) {
            const maskOptions = {
                mask: container.config.mask,
                definitions: {
                    // defaults are '0', 'a', '*'
                    // You can extend by adding other characters
                    A: /[A-Z]/
                }
            }
            const mask = IMask(input.current, maskOptions);
            mask.value = container.config.value;
        }
    }, [input.current])


    function getValue(event: ChangeEvent) {
        return (event.target as HTMLInputElement).value;
    }

    return <>
        {container.config.readOnly && <>
            <dt>{container.config.label}</dt>
            <dd>{container.config.value ?? '--'}</dd>
        </>}
        {!container.config.readOnly && <>
            <label htmlFor={container.id}>
                {container.config.label}{container.config.required ? ' *' : ''} ({container.config.mask})
                {container.config.helperText &&
                    <span data-tooltip={container.config.helperText}>?</span>
                }
            </label>
            <input
                ref={input}
                id={container.id}
                type="text"
                placeholder={container.config.placeholder}
                onBlur={e => {
                    container.updateFieldValue(getValue(e));
                    container.triggerFieldChange(getValue(e));
                }}
            />
        </>}
        {container.config.validatemessage && <span>{container.config.validatemessage}</span>}
    </>
}