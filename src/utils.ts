import debug from "debug";

export function createDebugger(name: string) {
  return debug(`rvvup-sdk:${name}`);
}
