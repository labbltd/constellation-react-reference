# Constellation React Reference

This project is a reference implementation for the React framework using the [Pega Constellation DX API](https://docs.pega.com/bundle/dx-api/page/platform/dx-api/dx-api-version-2-con.html), implemented on the [DX Accelerator](https://community.pega.com/marketplace/component/dx-accelerator). For further documentation on the DX accelerator, see the [API specification](https://labbltd.github.io/dx-accelerator/index.html).

The application is built on the following libraries:

- [Pega Constellation Core](https://www.npmjs.com/package/@pega/constellationjs) for communication with the DX API
- [Pega Constellation Core Types](https://www.npmjs.com/package/@labb/constellation-core-types) for powering the Constellation Core in TypeScript
- [DX Engine](https://www.npmjs.com/package/@labb/dx-engine) for bootstrapping and running the Constellation Core
- [React DX Adapter](https://www.npmjs.com/package/@labb/react-adapter) for bridging the React framework to the DX Engine
- [React](https://www.npmjs.com/package/react) for the Angular framework

## Development server

Run `npm run dev` for a dev server. Navigate to [http://localhost:5173/](http://localhost:5173) to view the React Reference application.

The project is configured to communicate with a Pega mocking server running on `localhost:3333` but can be changed to talk directly to a live Pega Infinity server.

## Development

The main entry point is the [src/main.tsx](src/main.tsx) which uses the [OAuth2Service](https://labbltd.github.io/dx-accelerator/classes/_labb_dx_engine.OAuth2Service.html) to authenticate with a server and uses the [PegaEmbed](https://labbltd.github.io/dx-accelerator/functions/_labb_react-adapter.PegaEmbed.html) which bootstraps the Constellation Core and starts a new case type.

Bootstrapping the constellation core makes the [PCore class](https://labbltd.github.io/dx-accelerator/classes/_labb_constellation_core_types.PCore.html) globally available on the window.

The main mapping file is available at [src/pega/ContainerMapping.tsx](src/pega/ContainerMapping.tsx). A minimal setup would be when only the `default` mapping is configured. In this minimal setup the x-ray feature can be used by executing `window.PCore.getDebugger().toggle()` in the browser console. Enabling X-Ray will show for each container the componentName and a unique counter for that container. Use the componentName as a key in the mapping module. E.g. when X-Ray shows a specific container as `Dropdown.67`, then add the following mapping to add an implementation for all containers of type `Dropdown`:

```TypeScript
DxReactAdapter.registerMapping('Dropdown', React.lazy(() => import('./containers/Dropdown')));
```

Not all containers need an implementation. A fallback to a default implementation is sufficient for most containers. Only when a special presentation of the container state or when user interaction is desired, then a specialized DX container implementation can be added.

Implementing DX Components is as easy as creating an React functional Component and in the props accept a [PContainer](https://labbltd.github.io/dx-accelerator/classes/_labb_dx-engine.PContainer.html) class. The DX React Adapter will instantiate the correct class and make a [PContainer](https://labbltd.github.io/dx-accelerator/classes/_labb_dx_engine.PContainer.html) available on the `container` property.

```TypeScript
import { PContainer } from '@labb/dx-engine';

export default function DxDropdown(props: { container: PContainer }) {
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return <>
    <label>{props.container.config.label}</label>
    ....
}
```

With X-Ray enabled, selecting a container in the browser will open a window which shows the state of that container. The configuration properties can be accessed in the Angular DX Component by reading from the `container.config` object. The [PConnect object](https://labbltd.github.io/dx-accelerator/classes/_labb_constellation_core_types.PConnect.html) associated with each container is available on `container.pconnect`.

The config object shape depends on the container type. To get IDE support, the config object shape can be passed in the PContainer. Available config object shapes can be viewed at the [API documentation](https://labbltd.github.io/dx-accelerator/hierarchy.html#@labb/constellation-core-types.DefaultProps).

```TypeScript
class DxDropdownComponent extends PContainerComponent<PContainer<PickListProps>>
```

The [PContainer class](https://labbltd.github.io/dx-accelerator/classes/_labb_dx_engine.PContainer.html) has utility methods available for writing changes back into Pega, such as `container.updateFieldValue(...)` and `container.triggerFieldChange(...)`. Specialized containers might have other properties and methods available which aid in retrieving and updating state for that container. See the [API specification](https://labbltd.github.io/dx-accelerator/hierarchy.html#@labb/dx-engine.PContainer) for an overview of specialized containers. When a specialized container is available in the DX Engine, this can be specified using generics.

```TypeScript
import { FlowContainer } from '@labb/dx-engine';

export default function DxDropdown(props: { container: FlowContainer }) {
```

E.g. when implementing the [FlowContainer](https://labbltd.github.io/dx-accelerator/classes/_labb_dx-engine.FlowContainer.html), special properties and methods are available such as `container.actionButtons` and `container.buttonClick(...)`.
