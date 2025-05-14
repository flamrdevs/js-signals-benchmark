import { record, type TypeofRecord } from "./graphs";

export const selectedIds: (keyof TypeofRecord)[] = Object.keys(record) as (keyof TypeofRecord)[];
// export const selectedIds: (keyof TypeofRecord)[] = [];
