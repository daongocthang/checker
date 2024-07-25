export const range = (n: number) => [...Array(n).keys()];

export function chunks<T>(rows: T[], size: number): T[][] {
    const holder = [];
    while (rows.length) {
        holder.push(rows.splice(0, size));
    }
    return holder;
}
export async function handleChunks<T>(rows: T[], size: number, cb: CallableFunction) {
    while (rows.length) {
        await cb(rows.splice(0, size));
    }
}
