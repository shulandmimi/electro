import { Rule } from 'antd/lib/form';
function required(message?: string): Rule {
    return {
        required: true,
        message: message || '',
    };
}

export default required;
