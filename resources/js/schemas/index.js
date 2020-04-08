import { schema } from 'normalizr';

export const userSchema = new schema.Entity('users');
export const userSchemaWithContacts = new schema.Entity('users');
export const messageSchema = new schema.Entity('messages');
export const roomSchema = new schema.Entity('rooms');

userSchemaWithContacts.define({
    requestedFriendsTo: [userSchema],
    requestFriendsBy: [userSchema],
    friends: [userSchema],
    rooms: [roomSchema],
});

messageSchema.define({
    user: userSchema
});

roomSchema.define({
    users: [userSchema]
});
