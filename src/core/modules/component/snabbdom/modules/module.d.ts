import { PreHook, CreateHook, UpdateHook, DestroyHook, RemoveHook, PostHook } from '../hooks.js';
export interface Module {
  pre: PreHook;
  create: CreateHook;
  update: UpdateHook;
  destroy: DestroyHook;
  remove: RemoveHook;
  post: PostHook;
}
