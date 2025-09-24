import { Multiselect } from "@labb/dx-engine";
import { ChangeEvent, useState } from "react";

export default function DxMultiSelect(props: { container: Multiselect }) {
    const [searchValue, setSearchValue] = useState('');
    const { container } = props;

    function search(event: ChangeEvent) {
        const value = (event.target as HTMLInputElement).value;
        setSearchValue(value);
        container.onSearchHandler(value);
    }

    return <>
        <label>
            {container.config.label}
            <input type="text" value={searchValue} onBlur={e => search(e)} />
        </label>
        {container.itemsTree.map(item =>
            <label key={item.id}>
                <input type="checkbox" checked={item.selected} onChange={() => container.toggleItem(item.id!)} />{item.primary}
            </label>
        )}
    </>
}