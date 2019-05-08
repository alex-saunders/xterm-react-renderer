import Reconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';
import emptyFn from 'fbjs/lib/emptyFunction';

import { createElement, getHostContextNode } from '../utils/createElement';

const XTermRenderer = Reconciler({
  createInstance(type, props, _internalInstanceHandle) {
    return createElement(type, props);
  },

  createTextInstance(text, _rootContainerInstance, _internalInstanceHandle) {
    return text;
  },

  finalizeInitialChildren(_wordElement, _type, _props) {
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit(_container) {
    emptyFn();
  },

  prepareUpdate(
    _instance,
    _type,
    oldProps,
    newProps,
    _rootContainerInstance,
    _hostContext
  ) {
    if (oldProps.children !== newProps.children) {
      return {
        children: newProps.children
      };
    }
    return null;
  },

  getRootHostContext(instance) {
    return getHostContextNode(instance);
  },

  getChildHostContext() {
    return emptyObject;
  },

  shouldSetTextContent(_type, _props) {
    return false;
  },

  cloneInstance(
    _instance,
    _updatePayload,
    type,
    _oldProps,
    newProps,
    _internalInstanceHandle,
    _keepChildren,
    _recyclableInstance
  ) {
    if (_oldProps.children !== newProps.children) {
      return {
        children: newProps.children
      };
    }

    return createElement(type, newProps);
  },

  removeChild() {
    emptyFn();
  },

  removeChildFromContainer(container, child) {
    container.removeChild(child);
  },

  appendChildToContainer(container, child) {
    container.appendChild(child);
  },

  replaceContainerChildren(_container, _newChildren) {
    emptyFn();
  },

  insertInContainerBefore(container, child, beforeChild) {
    container.appendBefore(child, beforeChild);
  },

  appendInitialChild(_parentInstance, _child) {
    emptyFn();
  },

  commitTextUpdate(_textInstance, _oldText, _newText) {
    emptyFn();
  },

  commitUpdate(
    instance,
    updatePayload,
    _type,
    _oldProps,
    _newProps,
    _internalInstanceHandle
  ) {
    if (updatePayload) {
      instance.replaceChild(updatePayload.children);
    }
  },

  resetAfterCommit(_info) {
    emptyFn();
  },

  now() {
    return performance.now();
  },

  supportsMutation: true,
  supportsPersistence: false
});

export default XTermRenderer;
