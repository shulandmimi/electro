import { NSpin, NEmpty } from 'naive-ui';
interface SpinAndEmptyProps {
    spinning: boolean;
}
export default function SpinAndEmpty(props: SpinAndEmptyProps) {
    return props.spinning ? <NSpin show /> : <NEmpty />;
}
