import React from "react";
import { useState } from "react";

export default function Counter() {
    const [counter, setCounter] = useState<number>(0);

    const increment = () => {
        setCounter(counter + 1);
    }

    return (
        <button onClick={increment}>{counter} 👍</button>
    )

}