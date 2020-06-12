export default function (args, name) {
  return args && args[1] && args[1].$$slots && args[1].$$slots[name] && args[1].$$slots[name].length > 0;
}
