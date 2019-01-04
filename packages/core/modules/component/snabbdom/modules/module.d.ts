import { PreHook, CreateHook, UpdateHook, DestroyHook, RemoveHook, PostHook } from '../hooks';
export interface Module {
    pre: PreHook;
    create: CreateHook;
    update: UpdateHook;
    destroy: DestroyHook;
    remove: RemoveHook;
    post: PostHook;
}
