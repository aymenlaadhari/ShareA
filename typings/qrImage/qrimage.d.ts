declare module 'qr-image' {
  export = qrimage;
}

declare module qrimage {
  export function imageSync(text: string, options?: {type?: string}): string;
}
