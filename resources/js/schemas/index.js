import { schema } from 'normalizr';

export const userSchema = new schema.Entity('users');
export const messageSchema = new schema.Entity('messages');
messageSchema.define({
    user: userSchema
});
