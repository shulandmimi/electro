import { Form, Select, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import { FormKeyMapping } from '../Settings/interface';
import { required, isNulOrSpace } from '@/tools/form';
import { fetch_electro_area_list, fetch_electro_building_list } from '@/service/electro';
import { useEffect } from 'react';

interface SetPositionProps {
    form: FormInstance;
    onSelected: (key: 'area' | 'building', value: any, options: any) => void;
}

export default function SetPosition(props: SetPositionProps) {
    const { form, onSelected } = props;

    const [account, area] = [form.getFieldValue(FormKeyMapping.ACCOUNT), form.getFieldValue(FormKeyMapping.AREA)];
    const {
        data: areas = [],
        loading: loadingOfArea,
        run: fetchArea,
    } = useRequest(async (account: string) => {
        try {
            const response = await fetch_electro_area_list(account);
            if (typeof response === 'string' || !response) {
                message.error(response || '获取数据失败~');
                return [];
            }

            const { query_elec_area: { areatab = [] } = {} } = response;

            return areatab;
        } catch (error) {
            return [];
        }
    });

    const {
        data: buildings = [],
        loading: loadingOfBuilding,
        run: fetchBuilding,
    } = useRequest(async (account: string, areaid: LabeledValue) => {
        const area = areas.find((item) => item.area === areaid.value);
        if (!area) {
            message.error('数据异常');
            return;
        }
        try {
            const response = await fetch_electro_building_list(account, area);
            if (typeof response === 'string' || !response) {
                message.error(response || '获取数据失败~');
                return [];
            }

            const { query_elec_building: { buildingtab = [] } = {} } = response;

            return buildingtab;
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        if (account) {
            fetchArea(account);
        }
    }, [account]);

    useEffect(() => {
        if (area) {
            fetchBuilding(account, area);
        }
    }, [area]);

    return (
        <>
            <Form.Item label="区域" name={FormKeyMapping.AREA} required rules={[required('请选择区域')]}>
                <Select
                    onChange={(values, options) => onSelected(FormKeyMapping.AREA, values, options)}
                    loading={loadingOfArea}
                    placeholder="请选择区域"
                    labelInValue
                    disabled={isNulOrSpace(account)}
                >
                    {areas.map((area) => (
                        <Select.Option data={area} key={area.area} value={area.area}>
                            {area.areaname}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="建筑" name={FormKeyMapping.BUILDING} required rules={[required('请选择建筑')]}>
                <Select
                    onChange={(values, options) => onSelected(FormKeyMapping.BUILDING, values, options)}
                    loading={loadingOfBuilding}
                    placeholder="请选择建筑"
                    labelInValue
                    disabled={isNulOrSpace(area)}
                >
                    {buildings.map((building) => (
                        <Select.Option data={building} key={building.buildingid} value={building.buildingid}>
                            {building.building}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="房间号" name={FormKeyMapping.ROOM} required rules={[required('请填写区域')]}>
                <Input placeholder="请填写房间号" autoComplete="off" disabled={isNulOrSpace(form.getFieldValue(FormKeyMapping.BUILDING))} />
            </Form.Item>
        </>
    );
}
