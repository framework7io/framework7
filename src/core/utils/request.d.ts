interface RequestXHR extends XMLHttpRequest {
  /** Object with passed XHR request parameters */
  requestParameters?: any;
  /** String with request URL */
  requestUrl?: string;
}

interface RequestParameters {
  /** Request url */
  url?: string;
  /** Request method (e.g. "POST", "GET", "PUT") */
  method?: string;
  /** If you need synchronous requests, set this option to `false` */
  async?: boolean;
  /** If set to false, it will force requested pages not to be cached by the browser. Setting cache to false will only work correctly with HEAD and GET requests. It works by appending "_nocache={timestamp}" to the GET parameters */
  cache?: boolean;
  /** Content type. Also could be 'multipart/form-data' and 'text/plain'. For cross-domain requests, setting the content type to anything other than application/x-www-form-urlencoded, multipart/form-data, or text/plain will trigger the browser to send a preflight OPTIONS request to the server */
  contentType?: any;
  /** If you wish to force a crossDomain request (such as JSONP) on the same domain, set the value of crossDomain to true. When true additional "X-Requested-With: XMLHttpRequest" header will be added to request */
  crossDomain?: boolean;
  /** Data to be sent to the server. It is converted to a query string, if not already a string. It's appended to the url for GET-requests. See processData option to prevent this automatic processing. For POST requests could be `FormData` type */
  data?: any;
  /** By default, data passed in to the data option as an object (technically, anything other than a string) will be processed and transformed into a query string, fitting to the default content-type "application/x-www-form-urlencoded". If you want to send a DOMDocument, or other non-processed data, set this option to `false` */
  processData?: boolean;
  /** The type of data that you're expecting back from the server. Could be 'text' or 'json' */
  dataType?: string;
  /** An object of additional header key/value pairs to send along with requests using the XMLHttpRequest transport */
  headers?: { [key: string]: any; };
  /** An object of fieldName-fieldValue pairs to set on the native XHR object */
  xhrFields?: { [key: string]: any; };
  /** A username to be used with XMLHttpRequest in response to an HTTP access authentication request */
  username?: string;
  /** A password to be used with XMLHttpRequest in response to an HTTP access authentication request */
  password?: string;
  /** Set a timeout (in milliseconds) for the request */
  timeout?: number;
  /** A pre-request callback function that can be used to modify passed parameters */
  beforeCreate? (xhr: RequestXHR, parameters: RequestParameters): any;
  /** A pre-request callback function that will be called before XHR opened. Can be used to modify XHR object. If you return false in this callback it will cancel the request */
  beforeOpen? (xhr: RequestXHR, parameters: RequestParameters): any;
  /** A pre-request callback function that can be used to modify the XHR object before it is sent. Use this to set custom headers, etc. If you return false in this callback it will cancel the request */
  beforeSend? (xhr: RequestXHR): any;
  /** A function to be called if the request succeeds */
  success? (data: any, status: number | string, xhr: RequestXHR): any;
  /** A function to be called if the request fails */
  error? (xhr: RequestXHR, status: number | string): any;
  /** A function to be called when the request finishes (after success and error callbacks are executed) */
  complete? (xhr: RequestXHR, status: number | string): any;
  /** An object of numeric HTTP codes and functions to be called when the response has the corresponding code.  */
  statusCode?: { [key: number]: any; };
}

interface RequestPromise {
  (parameters: RequestParameters): Promise<any>
  /** Load data from the server using a HTTP GET request */
  get: (
    url: string,
    data?: any,
    dataType?: string
  ) => Promise<any>
  /** Load data from the server using a HTTP POST request */
  post: (
    url: string,
    data?: any,
    dataType?: string
  ) => Promise<any>
  /** Load JSON-encoded data from the server using a GET HTTP request */
  json: (
    url: string,
    data?: any,
  ) => Promise<any>
  /** Send JSON data using a HTTP POST request */
  postJSON: (
    url: string,
    data?: any,
    dataType?: string
  ) => Promise<any>
}

export interface Request {
  (parameters: RequestParameters): RequestXHR
  /** Promise interface */
  promise: RequestPromise
  /** Load data from the server using a HTTP GET request */
  get: (
    url: string,
    data?: any,
    success?: (data: any, status: number | string, xhr: RequestXHR) => void,
    error?: (xhr: RequestXHR, status: number | string) => void,
    dataType?: string
  ) => RequestXHR
  /** Load data from the server using a HTTP POST request */
  post: (
    url: string,
    data?: any,
    success?: (data: any, status: number | string, xhr: RequestXHR) => void,
    error?: (xhr: RequestXHR, status: number | string) => void,
    dataType?: string
  ) => RequestXHR
  /** Load JSON-encoded data from the server using a GET HTTP request */
  json: (
    url: string,
    data?: any,
    success?: (data: any, status: number | string, xhr: RequestXHR) => void,
    error?: (xhr: RequestXHR, status: number | string) => void
  ) => RequestXHR
  /** Send JSON data using a HTTP POST request */
  postJSON: (
    url: string,
    data?: any,
    success?: (data: any, status: number | string, xhr: RequestXHR) => void,
    error?: (xhr: RequestXHR, status: number | string) => void,
    dataType?: string
  ) => RequestXHR
  /** Set default values for future Ajax requests */
  setup: (parameters: RequestParameters) => void
}

declare const Request : Request;

export default Request;
