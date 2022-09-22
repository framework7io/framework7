import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace Form {
  interface DomEvents {
    /** Event will be triggered on form when calling app.form.convertToData */
    'form:todata': () => void;
    /** Event will be triggered on form when calling app.form.fillFromData */
    'form:fromdata': () => void;

    /** Event will be triggered right after for data saved */
    'form:storedata': () => void;

    /** Event will be triggered after successful Ajax request */
    'formajax:success': () => void;
    /** Event will be triggered after Ajax request completed */
    'formajax:complete': () => void;
    /** Event will be triggered right before Ajax request */
    'formajax:beforesend': () => void;
    /** Event will be triggered on Ajax request error */
    'formajax:error': () => void;
  }
  interface AppMethods {
    form: {
      /** convert form fields values to data object */
      convertToData(form: HTMLElement | CSSSelector): object;

      /** fill up form according to data object */
      fillFromData(form: HTMLElement | CSSSelector, data: object): void;

      /** get form data for the form with specified id attribute */
      getFormData(formId: string): object;
      /** store form data for the form with specified id attribute */
      storeFormData(formId: string, data: object): void;
      /** remove form data for the form with specified id attribute */
      removeFormData(formId: string): void;
    };
  }
  interface AppParams {}
  interface AppEvents {
    /** Event will be triggered on form when calling app.form.convertToData */
    formToData: (form: HTMLElement, data: object) => void;
    /** Event will be triggered on form when calling app.form.fillFromData  */
    formFromData: (form: HTMLElement, data: object) => void;

    /** Event will be triggered right after for data saved */
    formStoreData: (form: HTMLElement, data: object) => void;

    /** Event will be triggered right after for data saved */
    formAjaxSuccess: (form: HTMLElement, data: object, response: Response) => void;
    /** Event will be triggered right after for data saved */
    formAjaxComplete: (form: HTMLElement, data: object, response: Response) => void;
    /** Event will be triggered right after for data saved */
    formAjaxBeforeSend: (form: HTMLElement, data: object) => void;
    /** Event will be triggered right after for data saved */
    formAjaxError: (form: HTMLElement, data: object, error: any) => void;
  }
}
declare const FormComponent: Framework7Plugin;

export default FormComponent;
