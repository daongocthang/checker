declare global {
    var publicDir: string;
}

export interface ParsedObject {
    model: string;
    serial?: string;
}

export default global;
