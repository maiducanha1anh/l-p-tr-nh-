import { useState} from "react";
function Counter2() {
    const [count, setCount] = useState(0);
     const handleClickme = () => {
        setCount(count + 1);
     }

    return (
        <>
            <p>Counter 2</p>
            <p>You clicked {count} times</p>
            <button onClick={handleClickme}>CLick me</button>
        </>
    )
}
export default Counter2;