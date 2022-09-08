export const checkNotEmpty = (value: string): boolean => value.trim().length !== 0;

export const checkEmail = (value: string): boolean =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value.trim()
    );

export const checkPhone = (value: string): boolean => /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value.trim());

export const checkSelect = (value?: string): boolean => !!value && value !== '0';
