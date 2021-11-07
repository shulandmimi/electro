import { Input, Form } from 'antd';
import { required } from '@/tools/form';

export default function SetAccount() {
    return (
        <Form.Item label="账户" name="account" required={true} rules={[required('请填写账户号码')]}>
            <Input autoComplete="off" placeholder="请填写账户号码(校园卡)"></Input>
        </Form.Item>
    );
}
