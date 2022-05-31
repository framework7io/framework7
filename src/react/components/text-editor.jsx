import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs, getSlots, noUndefinedProps, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';
import { watchProp } from '../shared/watch-prop.js';

/* dts-imports
import { TextEditor } from 'framework7/types';
*/
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  COLOR_PROPS
  mode? : string
  value? : string
  buttons? : Array<any>
  customButtons? : Object
  dividers? : boolean
  imageUrlText? : string
  linkUrlText? : string
  placeholder? : string
  clearFormattingOnPaste? : boolean
  resizable? : boolean
  onTextEditorChange? : (value?: any) => void
  onTextEditorInput? : (value?: any) => void
  onTextEditorFocus? : (...args: any[]) => void
  onTextEditorBlur? : (...args: any[]) => void
  onTextEditorButtonClick? : (button?: any) => void
  onTextEditorKeyboardOpen? : (...args: any[]) => void
  onTextEditorKeyboardClose? : (...args: any[]) => void
  onTextEditorPopoverOpen? : (...args: any[]) => void
  onTextEditorPopoverClose? : (...args: any[]) => void
  onTextEditorInsertLink?: (...args: any[]) => void
  onTextEditorInsertImage?: (...args: any[]) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null; f7TextEditor: () => TextEditor.TextEditor;}>;
  children?: React.ReactNode;
*/

const TextEditor = forwardRef((props, ref) => {
  const f7TextEditor = useRef(null);
  const {
    className,
    id,
    style,
    mode,
    value,
    buttons,
    customButtons,
    dividers,
    imageUrlText,
    linkUrlText,
    placeholder,
    clearFormattingOnPaste,
    resizable = false,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onChange = (editor, editorValue) => {
    emit(props, 'textEditorChange', editorValue);
  };
  const onInput = (editor, editorValue) => {
    emit(props, 'textEditorInput', editorValue);
  };
  const onFocus = () => {
    emit(props, 'textEditorFocus');
  };
  const onBlur = () => {
    emit(props, 'textEditorBlur');
  };
  const onButtonClick = (editor, button) => {
    emit(props, 'textEditorButtonClick', button);
  };
  const onKeyboardOpen = () => {
    emit(props, 'textEditorKeyboardOpen');
  };
  const onKeyboardClose = () => {
    emit(props, 'textEditorKeyboardClose');
  };
  const onPopoverOpen = () => {
    emit(props, 'textEditorPopoverOpen');
  };
  const onPopoverClose = () => {
    emit(props, 'textEditorPopoverClose');
  };
  const onInsertLink = (editor, url) => {
    emit(props, 'textEditorInsertLink', url);
  };
  const onInsertImage = (editor, url) => {
    emit(props, 'textEditorInsertImage', url);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7TextEditor: () => f7TextEditor.current,
  }));

  watchProp(value, (newValue) => {
    if (f7TextEditor.current) {
      f7TextEditor.current.setValue(newValue);
    }
  });

  const onMount = () => {
    const params = noUndefinedProps({
      el: elRef.current,
      mode,
      value,
      buttons,
      customButtons,
      dividers,
      imageUrlText,
      linkUrlText,
      placeholder,
      clearFormattingOnPaste,
      on: {
        change: onChange,
        input: onInput,
        focus: onFocus,
        blur: onBlur,
        buttonClick: onButtonClick,
        keyboardOpen: onKeyboardOpen,
        keyboardClose: onKeyboardClose,
        popoverOpen: onPopoverOpen,
        popoverClose: onPopoverClose,
        insertLink: onInsertLink,
        insertImage: onInsertImage,
      },
    });
    f7ready(() => {
      f7TextEditor.current = f7.textEditor.create(params);
    });
  };

  const onDestroy = () => {
    if (f7TextEditor.current && f7TextEditor.current.destroy) {
      f7TextEditor.current.destroy();
    }
    f7TextEditor.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  const slots = getSlots(props);

  const classes = classNames(
    className,
    'text-editor',
    resizable && 'text-editor-resizable',
    colorClasses(props),
  );
  return (
    <div ref={elRef} id={id} style={style} className={classes} {...extraAttrs}>
      {slots['root-start']}
      <div className="text-editor-content" contentEditable>
        {slots.default}
      </div>
      {slots['root-end']}
      {slots.root}
    </div>
  );
});

TextEditor.displayName = 'f7-text-editor';

export default TextEditor;
