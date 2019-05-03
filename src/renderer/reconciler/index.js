import Reconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';

import { createElement, getHostContextNode } from '../utils/createElement';

const getNewText = (oldProps, newProps) => {
  const regex = new RegExp(`${oldProps.children}(.*)`);
  const results = regex.exec(newProps.children);
  if (results) {
    console.log('NEW TEXT', results);
    const newText = results[1];
    return newText;
  }
};

const XTermRenderer = Reconciler({
  createInstance(type, props, _internalInstanceHandle) {
    console.log('createInstance');
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

  prepareForCommit(container) {
    // container.root.write('\x1b[H\x1b[2J');

    // container.root.reset();
    // container.root.clear();
    // container.root.write('\u001Bc');
    console.log('prepareForCommit');
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
    console.log('getRootHostContext', instance);

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
    console.log('removeChild');
  },

  removeChildFromContainer(container, child) {
    child.removeSelf();
    container.removeChild(child);

    console.log('removeChildFromContainer', container, child);
  },

  createContainerChildSet() {
    return [];
  },

  appendChildToContainer(container, child) {
    // container.appendChild(child)
    // createElement('text', child);
    // child.appendChild(child.props.children);
    console.log('appendChildToContainer', container, child);
    child.appendChild(child.props.children, container.position);
    container.appendChild(child);
  },

  appendChildToContainerChildSet(childSet, child) {
    childSet.push(child);
  },

  replaceContainerChildren(container, newChildren) {
    console.log('replaceContainerChildren', container, newChildren);
    for (let child of newChildren) {
      if (child.props && child.props.children) {
        child.appendChild(child.props.children);
      } else {
        child.appendChild();
      }
    }
  },

  appendInitialChild(parentInstance, child) {
    // parentInstance.appendChild(child);
    // console.log('appendInitialChild', parentInstance, child);
    // parentInstance.appendChild(child);
  },

  commitTextUpdate(textInstance, oldText, newText) {
    // console.log('commitTextUpdate', textInstance, oldText, newText);
  },

  commitUpdate(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    internalInstanceHandle
  ) {
    if (updatePayload) {
      instance.replaceChild(updatePayload.children);
    }

    console.log('commitUpdate', oldProps, newProps, updatePayload);
  },

  resetAfterCommit() {},

  finalizeContainerChildren(container, newChildren) {},

  now() {
    return performance.now();
  },

  supportsMutation: true,
  supportsPersistence: false
});

export default XTermRenderer;
