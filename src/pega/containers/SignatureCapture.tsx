import { PContainer } from "@labb/dx-engine";
import { useEffect, useRef, useState } from "react";
import SignaturePad from 'signature_pad';

export default function DxSignatureCapture(props: { container: PContainer }) {
    const canvas = useRef<HTMLCanvasElement>(null);
    const { container } = props;
    const signature = useRef<SignaturePad | null>(null);
    const [hasValueChanged, setHasValueChanged] = useState(false);
    const [info, setInfo] = useState('');

    useEffect(() => {
        if (!canvas.current) return;
        signature.current = new SignaturePad(canvas.current, {
            penColor: '#056dae'
        });
        signature.current.addEventListener('endStroke', () => {
            onEndStroke();
        });
        resizeCanvas();
        signature.current.on();
    }, [canvas.current])

    function onClear() {
        signature.current?.clear();
        setHasValueChanged(false);
        setInfo('');
    }

    function onAccept() {
        const newValue = canvas.current?.toDataURL('image/svg+xml');
        if (newValue) {
            container.updateFieldValue(newValue);
            setHasValueChanged(false);
            setInfo('Signature captured');
        }
    }

    function resizeCanvas() {
        if (!canvas.current) return;
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.current.width = canvas.current.offsetWidth * ratio;
        canvas.current.height = canvas.current.offsetHeight * ratio;
        canvas.current.getContext('2d')?.scale(ratio, ratio);
    }

    function onEndStroke() {
        setHasValueChanged(true);
    }

    return <>
        <label htmlFor={props.container.id}>
            {props.container.config.label}
            {props.container.config.required ? ' *' : ''}
            {props.container.config.helperText && <span data-tooltip={props.container.config.helperText}>?</span>}
        </label>
        {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
        {container.config.readOnly && <img src={container.config.value} />}
        {
            !container.config.readOnly && <>
                <canvas id={props.container.id} style={{ width: '100%', height: '200px', border: '1px dashed' }} ref={canvas}></canvas>
                <button type="button" onClick={() => onClear()}>
                    Clear
                </button>
                <button type="button" onClick={() => onAccept()}
                    disabled={!hasValueChanged}>
                    Accept
                </button>
                {info && <div>{info}</div>}
            </>
        }
    </>
}