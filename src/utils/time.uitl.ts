export const currentTimeMillis = () => new Date().getTime();
export const onlyUTCDate = () => new Date(new Date().setUTCHours(-7, 0, 0, 0));
