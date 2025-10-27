import { DxReactAdapter } from '@labb/react-adapter';
import * as React from 'react';

DxReactAdapter.registerMapping('default', React.lazy(() => import('./containers/Default')));

// layouts
DxReactAdapter.registerMapping('CaseSummary', React.lazy(() => import('./containers/CaseSummary')));
DxReactAdapter.registerMapping('DefaultForm', React.lazy(() => import('./containers/DefaultForm')));
DxReactAdapter.registerMapping('DetailsThreeColumn', React.lazy(() => import('./containers/DetailsThreeColumn')));
DxReactAdapter.registerMapping('DetailsTwoColumn', React.lazy(() => import('./containers/DetailsTwoColumn')));
DxReactAdapter.registerMapping('FlowContainer', React.lazy(() => import('./containers/FlowContainer')));
DxReactAdapter.registerMapping('RootContainer', React.lazy(() => import('./containers/RootContainer')));
DxReactAdapter.registerMapping('ListPage', React.lazy(() => import('./containers/ListView')));
DxReactAdapter.registerMapping('ListView', React.lazy(() => import('./containers/ListView')));
DxReactAdapter.registerMapping('ModalViewContainer', React.lazy(() => import('./containers/ModalViewContainer')));
DxReactAdapter.registerMapping('SimpleTableManual', React.lazy(() => import('./containers/SimpleTableManual')));
DxReactAdapter.registerMapping('View', React.lazy(() => import('./containers/View')));
DxReactAdapter.registerMapping('FieldGroupListItem', React.lazy(() => import('./containers/FieldGroupListItem')));

// controls
DxReactAdapter.registerMapping('AutoComplete', React.lazy(() => import('./containers/Dropdown')));
DxReactAdapter.registerMapping('Attachment', React.lazy(() => import('./containers/Attachment')));
DxReactAdapter.registerMapping('Checkbox', React.lazy(() => import('./containers/Checkbox')));
DxReactAdapter.registerMapping('Currency', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Date', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('DateTime', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Decimal', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Dropdown', React.lazy(() => import('./containers/Dropdown')));
DxReactAdapter.registerMapping('Email', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Integer', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Location', React.lazy(() => import('./containers/Location')));
DxReactAdapter.registerMapping('MultiSelect', React.lazy(() => import('./containers/MultiSelect')));
DxReactAdapter.registerMapping('Percentage', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Phone', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('RadioButtons', React.lazy(() => import('./containers/RadioButtons')));
DxReactAdapter.registerMapping('RichText', React.lazy(() => import('./containers/TextArea')));
DxReactAdapter.registerMapping('TextArea', React.lazy(() => import('./containers/TextArea')));
DxReactAdapter.registerMapping('TextInput', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Time', React.lazy(() => import('./containers/TextInput')));

// custom controls
DxReactAdapter.registerMapping('Pega_Extensions_PasswordInput', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Pega_Extensions_ActionableButton', React.lazy(() => import('./containers/ActionableButton')));
DxReactAdapter.registerMapping('Pega_Extensions_MaskedInput', React.lazy(() => import('./containers/MaskedInput')));
DxReactAdapter.registerMapping('Pega_Extensions_SignatureCapture', React.lazy(() => import('./containers/SignatureCapture')));
