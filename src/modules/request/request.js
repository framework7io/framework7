/* eslint no-param-reassign: "off" */
import Request from '../../utils/request';

export default {
  name: 'request',
  create() {
    const app = this;
    app.request = Request;
  },
  static: {
    request: Request,
  },
};
