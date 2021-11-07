import { useState } from 'react';

export default function useRerender() {
    const [, setBoolean] = useState(false);
    return () => setBoolean(s => !s);
}
