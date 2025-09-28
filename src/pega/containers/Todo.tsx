import { Task } from "@labb/constellation-core-types";
import { PContainer } from "@labb/dx-engine";
import { useState } from "react";

export default function DxTodo(props: { container: PContainer }) {
    const [expanded, setExpanded] = useState(false);
    const tasks: Task[] = expanded ?
        props.container.config.datasource.source :
        props.container.config.datasource.source.slice(0, 3);

    function selectTask(task: Task) {
        props.container.pconnect
            .getActionsApi()
            .openWorkByHandle(task.id, task.classname);
    }

    return <>
        <h2>{props.container.config.headerText} {props.container.config.datasource.source.length}</h2>
        <table>
            <thead>
                <tr>
                    <th>Step Name</th>
                    <th>Case ID</th>
                    <th>Urgency</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map((task: any) => (
                        <tr key={task.id}>
                            <td>{task.stepName}</td>
                            <td>{task.value.split(' ')[1]}</td>
                            <td>{task.priority}</td>
                            <td>{task.status}</td>
                            <td onClick={() => selectTask(task)}>Go</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <button onClick={() => setExpanded(!expanded)}>Show {expanded ? 'less' : 'more'}</button>
    </>
}