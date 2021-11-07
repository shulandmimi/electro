import { useSelector, useDispatch } from 'react-redux';
import PositionItem from './PositionItem';
import { RootState } from '@/store/index';

export default function Position() {
    const electro = useSelector((state: RootState) => state.PositionSettings);

    return (
        <div>
            {electro.rooms.map((item) => {
                return (
                    <PositionItem
                        key={item.id}
                        position={item}
                        onDelete={() => {
                            // useDispatch();
                        }}
                        onClick={() => console.log('click')}
                    />
                );
            })}
        </div>
    );
}
