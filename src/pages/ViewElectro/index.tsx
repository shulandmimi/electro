import { fetch_electro } from '@/service/electro/index';
import style from './index.scss';
import { Position, ViewType } from '@/store/settings/PositionSettings/interface';
import ViewElectroDefault from './viewElectroTheme/Default';
import { useRequest } from 'ahooks';
import { useMount } from 'ahooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { message, Row, Col } from 'antd';


export default function ViewElectro() {
    const { rooms, account, type } = useSelector((state: RootState) => state.PositionSettings);
    const { data: state, run } = useRequest(async function fetchElectro(account: string, rooms: Position[]) {
        const { code, data, msg } = await fetch_electro(account, rooms);

        if (code !== 200) {
            message.error(msg || '系统错误');
            return [];
        }

        return data;

        // const result = await Promise.all(
        //     rooms.map(item => fetch_electro(account, item.area, item.building, item.room))
        // );
        // return result
        //     .map(({ code, data, msg }) => {
        //         if (code !== 200) {
        //             message.error(msg || '系统错误');
        //             return;
        //         }
        //         return data;
        //     })
        //     .filter(Boolean);
    });

    useMount(() => {
        console.log(account, rooms, rooms.length);
        if (account && rooms && rooms.length) {
            run(account, rooms);
        }
    });

    function renderElectro() {
        if (!state?.length) return null;
        switch (type) {
            case ViewType.One:
                return (
                    <Row gutter={[12, 8]}>
                        <Col span={24}>
                            <ViewElectroDefault {...state[0]}></ViewElectroDefault>
                        </Col>
                    </Row>
                );
            case ViewType.Multile:
                return (
                    <Row className={style.row} justify="center" gutter={[12, 8]}>
                        {state?.map((item) => (
                            <Col key={item.id} xxl={12} xl={12} lg={24} span={24}>
                                <ViewElectroDefault {...item}></ViewElectroDefault>
                            </Col>
                        ))}
                    </Row>
                );
            default:
                return null;
        }
    }
    return <div className={style.root}>{renderElectro()}</div>;
}
