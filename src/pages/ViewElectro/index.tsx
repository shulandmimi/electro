import { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { useSelector, useDispatch } from 'react-redux';
import { message, Row, Col, Spin } from 'antd';
import { fetch_electro } from '@/service/electro/index';
import style from './index.scss';
import { Position, ViewType } from '@/store/settings/PositionSettings/interface';
import ViewElectroDefault from './viewElectroTheme/Default';
import { RootState } from '@/store/index';
import { Electro } from '@/service/electro/index';
import { subscrirbeMail, deSubscribeMail } from '@/service/mail';
import { removePosition } from '@/store/settings/PositionSettings';
import { useRerender } from '@/hooks';

export default function ViewElectro() {
    const dispatch = useDispatch();
    const rerender = useRerender();
    const { rooms, account, type } = useSelector((state: RootState) => state.PositionSettings);
    const {
        data: state,
        run,
        loading,
    } = useRequest(async function fetchElectro(account: string, rooms: Position[]) {
        const { code, data, msg } = await fetch_electro(
            account,
            rooms.map((item) => item.id),
        );

        if (code !== 200) {
            message.error(msg || '系统错误');
            return [];
        }

        return data;
    });

    const deletePositionHandler = (electro: Electro) => {
        dispatch(removePosition(electro.position));
    };

    const subscribeHandler = async (electro: Electro) => {
        const { code, msg } = await subscrirbeMail(electro.position.id);
        if (code != 200) {
            message.error(msg || '解除绑定失败');
            return;
        }
        message.success('绑定成功');
        run(account!, rooms);
    };

    const deSubscribeHandler = async (electro: Electro) => {
        const { code, msg } = await deSubscribeMail(electro.position.id);
        if (code != 200) {
            message.error(msg || '解除绑定失败');
            return;
        }
        message.success('解除绑定成功');
        run(account!, rooms);
    };

    useEffect(() => {
        if (account && rooms && rooms.length) {
            run(account, rooms);
        }
    }, [account, rooms]);

    function renderElectro() {
        if (!state?.length) return null;
        switch (type) {
            case ViewType.One:
                return (
                    <Row className={style.row} gutter={[12, 8]}>
                        <Col className={style.col} span={24}>
                            <ViewElectroDefault
                                onSubscribe={() => subscribeHandler(state[0])}
                                onDeSubsribe={() => deSubscribeHandler(state[0])}
                                onDelete={() => deletePositionHandler(state[0])}
                                {...state[0]}
                            ></ViewElectroDefault>
                        </Col>
                    </Row>
                );
            case ViewType.Multile:
                return (
                    <Row className={style.row} justify="center" gutter={[12, 8]}>
                        {state?.map((item) => (
                            <Col className={style.col} key={item.id} xxl={12} xl={12} lg={24} span={24}>
                                <ViewElectroDefault
                                    onSubscribe={() => subscribeHandler(item)}
                                    onDeSubsribe={() => deSubscribeHandler(item)}
                                    onDelete={() => deletePositionHandler(item)}
                                    {...item}
                                ></ViewElectroDefault>
                            </Col>
                        ))}
                    </Row>
                );
            default:
                return null;
        }
    }
    return (
        <div className={style.root}>
            <Spin spinning={loading}>{renderElectro()}</Spin>
        </div>
    );
}
