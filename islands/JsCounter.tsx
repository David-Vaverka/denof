import { useState } from "preact/hooks";

export default function JsCounter() {
  const [count, setCount] = useState(0);
  return (
    <div class="mt-4 p-4 border rounded">
      <p class="mb-2">JS counter: {count}</p>
      <button
        class="px-2 py-1 bg-blue-500 text-white rounded"
        onClick={() => setCount((c) => c + 1)}
      >
        +1
      </button>
    </div>
  );
}
