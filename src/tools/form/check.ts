const regPassword = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[a-zA-Z])\S*$/;
const regMail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isMail = (str: string) => regMail.test(str);
export const isPassword = (str: string) => regPassword.test(str);
