export default function (router, method) {
  if (!router.view) {
    throw new Error(`Framework7: it is not allowed to use router methods on global app router. Use router methods only on related View, e.g. app.views.main.router.${method}(...)`);
  }
}
