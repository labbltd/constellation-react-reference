import { Attachment, FileStatus } from '@labb/dx-engine';
import { useRef, useState } from 'react';

export default function DxAttachment(props: {
  container: Attachment;
}): JSX.Element {
  const [downloadedImage, setDownloadedImage] = useState<string | undefined>();
  const { container } = props;
  const dialog = useRef<HTMLDialogElement>(null);

  async function preview(file: FileStatus) {
    if (file.linked) {
      setDownloadedImage('data:image/png;base64,' + await container.downloadFile(file.id))
    } else {
      setDownloadedImage(file.src);
    }
    dialog.current?.showModal();
  }

  return <>
    <label htmlFor={container.id}>
      {container.config.label}
      {container.config.required ? ' *' : ''}
      {props.container.config.helperText && <span data-tooltip={props.container.config.helperText}>?</span>}
    </label>
    {container.config.validatemessage && <em>{container.config.validatemessage}</em>}
    {(container.config.allowMultiple === 'true' || !container.files.length) &&
      <input
        id={container.id}
        type="file"
        onChange={(e) => container.uploadFile(e as unknown as Event)}
        multiple={container.config.allowMultiple === 'true'}
      />
    }
    {
      container.files.length > 0 &&
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {container.files.map(file =>
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{file.size ? container.formatBytes(file.size) : '--'}</td>
              <td>{file.type}</td>
              <td>{file.progress}%</td>
              <td>
                <button type="button" onClick={() => container.removeFile(file.id)}>Delete</button>
                {file.type?.startsWith('image') && <button type="button" onClick={async () => preview(file)}>Preview</button>}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    }
    <dialog ref={dialog}>
      <button type="button" onClick={async () => dialog.current?.close()}>Close</button>
      <img width="100%" src={downloadedImage} />
    </dialog>
  </>;
}
