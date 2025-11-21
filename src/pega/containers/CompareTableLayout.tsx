/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from 'react';

function getAllFields(pConnect: any) {
    const metadata = pConnect().getRawMetadata();
    if (!metadata.children) {
        return [];
    }

    let allFields = [];

    const makeField = (f: any) => {
        let category = 0;
        if (f.type === 'Group') {
            category = f.children && f.children.length > 0 ? 2 : 1;
        }
        return {
            ...pConnect().resolveConfigProps(f.config),
            type: f.type,
            category
        };
    };

    const hasRegions = !!metadata.children[0]?.children;
    if (hasRegions) {
        metadata.children.forEach((region: any) =>
            region.children.forEach((field: any) => {
                allFields.push(makeField(field));
                if (field.type === 'Group' && field.children) {
                    field.children.forEach((gf: any) => allFields.push(makeField(gf)));
                }
            })
        );
    } else {
        allFields = metadata.children.map(makeField);
    }
    return allFields;
}

export type TableLayoutProps = {
    heading: string;
    displayFormat: 'spreadsheet' | 'financialreport' | 'radio-button-card';
    selectionProperty?: string;
    currencyFormat: 'standard' | 'compact' | 'parentheses';
    getPConnect?: any;
};

type FieldObj = {
    type: string;
    config: {
        text: string;
        value: string;
        label: string;
        displayMode: string;
        displayAs?: string;
        negative?: string;
        notation?: string;
    };
};

export default function PegaExtensionsCompareTableLayout(props: TableLayoutProps) {
    const { displayFormat, heading, selectionProperty, currencyFormat, getPConnect } = props;
    const [numCols, setNumCols] = useState<number>(0);
    const [numFields, setNumFields] = useState<number>(0);
    const [fields, setFields] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selection, setSelection] = useState<Array<boolean>>([]);

    const metadata = getPConnect().getRawMetadata();

    const selectObject = (ID: any, index: number) => {
        if (metadata.config.selectionProperty) {
            const prop = metadata.config.selectionProperty.replace('@P ', '');
            getPConnect().getActionsApi().updateFieldValue(prop, ID);
            getPConnect().getActionsApi().triggerFieldChange(prop, ID);
        }
        const sel: Array<boolean> = [];
        for (let i = 0; i < numCols; i += 1) {
            sel.push(i === index);
        }
        setSelection(sel);
    };

    const genField = (componentType: string, val: any) => {
        const field: FieldObj = {
            type: componentType,
            config: {
                text: `${val}`,
                value: `${val}`,
                label: '',
                displayMode: 'DISPLAY_ONLY'
            }
        };
        if (componentType === 'Checkbox') {
            if (val === 'true' || val) {
                return <span style={{ color: 'green' }}>✓</span>;
            }
            return <span style={{ color: 'red' }}>X</span>;
        }
        if (componentType === 'URL') {
            field.config.displayAs = 'Image';
        }
        if (componentType === 'Currency') {
            if (currencyFormat === 'parentheses') {
                field.config.negative = 'parentheses';
            } else {
                field.config.notation = currencyFormat;
            }
        }
        return getPConnect().createComponent(field);
    };

    useEffect(() => {
        const tmpFields = getAllFields(getPConnect);
        if (tmpFields && tmpFields[0] && tmpFields[0].value) {
            setNumCols(tmpFields[0].value.length);
            tmpFields.forEach((child: any) => {
                if (
                    child.componentType &&
                    !(window as any).PCore.getComponentsRegistry().getLazyComponent(child.componentType)
                ) {
                    (window as any).PCore.getAssetLoader()
                        .getLoader('component-loader')([child.componentType])
                        .then(() => {
                            setNumFields(prevCount => prevCount + 1);
                        });
                } else {
                    setNumFields(prevCount => prevCount + 1);
                }
                if (typeof selectionProperty !== 'undefined' && child.label === 'ID') {
                    child.value.forEach((val: any, index: number) => {
                        if (val === selectionProperty) {
                            const sel: Array<boolean> = [];
                            for (let i = 0; i < child.value.length; i += 1) {
                                sel.push(i === index);
                            }
                            setSelection(sel);
                        }
                    });
                }
            });
            setFields(tmpFields);
        }
    }, [displayFormat, currencyFormat, selectionProperty, getPConnect]);

    useEffect(() => {
        if (fields && fields.length > 0 && numFields === fields.length) {
            setLoading(false);
        }
    }, [numFields, fields]);

    if (loading) {
        return <div>Loading content...'</div>;
    }

    if (displayFormat === 'radio-button-card') {
        return (
            <div>hello</div>
            // <RadioButtonGroup variant='card' label={heading} inline>
            //     {fields[0].value.map((val: any, i: number) => {
            //         const fvl: Array<{ id: string; name: string; value: JSX.Element | string }> = [];
            //         let objectId = '';
            //         fields.forEach((child: any, j: number) => {
            //             if (j > 0) {
            //                 if (child.label === 'ID') {
            //                     objectId = child.value[i];
            //                 } else {
            //                     fvl.push({
            //                         id: child.label,
            //                         name: child.label,
            //                         value:
            //                             child.value && child.value.length >= i
            //                                 ? genField(child.componentType, child.value[i])
            //                                 : ''
            //                     });
            //                 }
            //             }
            //         });
            //         return (
            //             <RadioButton
            //                 label={
            //                     <FieldGroup name={val} headingTag='h3'>
            //                         <FieldValueList fields={fvl} />
            //                     </FieldGroup>
            //                 }
            //                 key={`rb-${i}`}
            //                 id={val}
            //                 onChange={() => selectObject(objectId, i)}
            //                 checked={selection.length >= i ? selection[i] : false}
            //             />
            //         );
            //     })}
            // </RadioButtonGroup>
        )
    }
    return null;
};