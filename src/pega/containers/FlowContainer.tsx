import { ActionButton, Assignment } from '@labb/constellation-core-types';
import { FlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useEffect, useState } from 'react';

export default function DxFlowContainer(props: { container: FlowContainer }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [todoAssignments, setTodoAssignments] = useState<Assignment[]>([]);
  
  useEffect(() => {
    updateAssignments();
    props.container.updates.subscribe(() => {
      updateAssignments();
    });
  }, []);

  async function openAssignment(assignment: Assignment) {
    setLoading(true);
    props.container.openAssignment(assignment);
    setLoading(false);
  }

  function updateAssignments(): void {
    setTodoAssignments(props.container.getTodoAssignments());
  }

  function handleActionError(e: Error) {
    console.error(e);
    setErrorMessage(e.message || 'Error');
  }

  async function buttonClick(button: ActionButton) {
    setErrorMessage(null);
    setLoading(true);
    await props.container
      .buttonClick(button)
      .catch(e => handleActionError(e));
    setLoading(false);
  }

  return <>
    {props.container.config.caseMessages?.map(message =>
      <div key={message}>
        {message}
      </div>
    )}
    {!props.container.hasAssignment() && <>
      {todoAssignments.map(assignment =>
        <div key={assignment.ID}>
          <div>{assignment.processName} {'>'} {assignment.name}</div>
          <div>Assigned to {assignment.assigneeInfo?.name}</div>
          <button type="button" onClick={() => openAssignment(assignment)}>Go</button>
        </div>
      )}
      {todoAssignments.length === 0 && <p>Thank you for your request. We will contact you as soon as possible.</p>}
    </>}
    {props.container.hasAssignment() && <form>
      <ul>
        {props.container.navigation?.steps.map((step, i) => (
          <li key={`first_${i}`}>
            {step.name} ({step.ID}: {step.visited_status})
          </li>
        ))}
      </ul>
      <fieldset>
        <legend>
          <h2>
            {props.container.getActiveViewLabel() ||
              props.container.getAssignmentName()}
          </h2>
        </legend>
        {props.container.getValidationErrorMessages().map(message => <em key={message.label}>
          {message.label} {message.description} <br />
        </em>)}
        {props.container.children.map((child) => (
          <GeneratePContainer key={child.id} container={child} />
        ))}
      </fieldset>
      {props.container.actionButtons && (
        <>
          {props.container.actionButtons.secondary.map((button, idx) => (
            <button
              key={`secondary_${idx}`}
              type="button"
              disabled={loading}
              onClick={() => buttonClick(button)}
            >
              {button.name}
            </button>
          ))}
          {props.container.actionButtons.main.map((button, idx) => (
            <button
              key={`main_${idx}`}
              type="button"
              disabled={loading}
              onClick={() => buttonClick(button)}
            >
              {button.name}
            </button>
          ))}
        </>
      )}
      {errorMessage && <div>{errorMessage}</div>}
    </form>}
  </>
}
