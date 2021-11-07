import { isNil } from 'lodash';
export default function isNulOrSpace(v: any): v is undefined | null | '' {
    return isNil(v) || v === '';
}
