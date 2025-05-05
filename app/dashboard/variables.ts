import { makeVar } from '@apollo/client';

export const deletedRoomIds = makeVar<Set<string>>(new Set());
