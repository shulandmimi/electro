import { Tag } from 'antd';
import { random } from 'lodash';
import { Position } from '@/store/settings/PositionSettings/interface';
import useColor from '@/hooks/useColor';

interface PositionItemProps {
    position: Position;
    onDelete: () => void;
    onClick: (position: Position) => void;
}

const TagMap = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

export default function PositionItem(props: PositionItemProps) {
    const { position, onDelete, onClick } = props;
    const color = useColor();
    return (
        <Tag
            style={{ margin: '5px 10px 5px 0px' }}
            closable
            color={color}
            onClose={(e) => {
                e.preventDefault();
                props.onDelete();
            }}
        >
            <span onClick={() => onClick(position)}>{position.room?.room}</span>
        </Tag>
    );
}
