import { Form, Row, Col, Button, Spin, message, Modal } from 'antd';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import SetAccount from '../SetAccount';
import SetPosition from '../SetPosition';
import { RootState } from '@/store/index';
import { FormKeyMapping } from './interface';
import { useRerender } from '@/hooks';
import { checkRoom } from '@/service/electro/index';
import { Position } from '@/store/settings/PositionSettings/interface';
import { addPosition, setAccount } from '@/store/settings/PositionSettings';

export default function Settings() {
    const [form] = Form.useForm();
    const settings = useSelector((state: RootState) => state.PositionSettings);
    const selectedRef = useRef<{ [key: string]: any }>({});
    const isRerenderRef = useRef<boolean>(false);
    const checkState = useRef<Position>();
    const rerender = useRerender();
    const dispatch = useDispatch();

    const { loading, run: checkRoomValid } = useRequest(async (values: any) => {
        const { data, code, msg } = await checkRoom(values.account, selectedRef.current.area, selectedRef.current.building, {
            room: values.room,
            roomid: values.room,
        });
        if (code !== 200) {
            message.error(msg || '房间号无效，请稍后再试');
            return;
        }
        checkState.current = data;
        dispatch(setAccount(values.account));
    });

    const savePositionToStorage = () => {
        if (!checkState.current) {
            message.error('数据错误，请稍后再试');
            return;
        }
        dispatch(addPosition(checkState.current));
        checkState.current = undefined;
        message.success('保存成功');
        rerender();
    };

    useEffect(() => {
        if (settings.account) {
            form.setFields([
                {
                    name: FormKeyMapping.ACCOUNT,
                    value: settings.account,
                },
            ]);
            rerender();
        }
    }, []);

    return (
        <Spin spinning={loading}>
            <Form
                labelCol={{ span: 4 }}
                form={form}
                onValuesChange={() => {
                    isRerenderRef.current = true;
                    if (checkState.current) {
                        checkState.current = undefined;
                        rerender();
                    }
                }}
                onBlur={() => {
                    if (isRerenderRef.current) {
                        isRerenderRef.current = false;
                        rerender();
                    }
                }}
                onFinish={(values) => {
                    checkRoomValid(values);
                }}
            >
                <SetAccount />
                <SetPosition
                    onSelected={(key, values, options) => {
                        selectedRef.current[key] = options?.data;
                    }}
                    form={form}
                />

                <Row justify="center" gutter={[10, 0]}>
                    <Col span={10}>
                        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                            校验房间号
                        </Button>
                    </Col>
                    {checkState.current ? (
                        <Col>
                            <Button onClick={savePositionToStorage}>添加到本地</Button>
                        </Col>
                    ) : undefined}
                </Row>
            </Form>
        </Spin>
    );
}
