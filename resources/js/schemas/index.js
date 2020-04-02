import { schema } from 'normalizr';

export const userSchema = new schema.Entity('users');
export const userSchemaWithContacts = new schema.Entity('users');
export const messageSchema = new schema.Entity('messages');

userSchemaWithContacts.define({
    requestedFriendsTo: [userSchema],
    requestFriendsBy: [userSchema],
    friends: [userSchema],
});

messageSchema.define({
    user: userSchema
});
