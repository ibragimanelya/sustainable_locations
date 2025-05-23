import React from "react";
import { useState } from "react";

export default function Counter() {
    const [counter, setCounter] = useState<number>(0);

    const increment = () => {
        setCounter(counter + 1);
    }
    if (counter == 0) {
        return (
        <button className="btn btn-outline-info" onClick={increment}>{counter} Likes</button>
    )
    } else {
        return (
        <button className="btn btn-info" onClick={increment}>{counter} Likes</button>
    )
    }
    

}