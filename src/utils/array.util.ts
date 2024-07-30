export const range = (n: number) => [...Array(n).keys()];

export function chunks<T>(rows: T[], size: number): T[][] {
    const holder = [];
    while (rows.length) {
        holder.push(rows.splice(0, size));
    }
    return holder;
}
export function random(max: number): number {
    return Math.floor(Math.random() * max);
}
