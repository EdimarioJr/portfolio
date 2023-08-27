---
title: Introduction to refs in react
date: '2023-08-21'
slug: 'react-refs'
---

"useRef" is a React hook that takes an "initialValue" as an argument and returns a reference, which is an object with a "current" property.

```js
import { useRef } from 'react';

function MyComponent() {
	const initialValue = 0;
	const reference = useRef(initialValue);

	const someHandler = () => {
		// Acessa o valor current
		const value = reference.current;

		// Atualiza o valor current
		reference.current = newValue;
	};

	// ...
}
```

There are two important points about this reference:

The "current" value is persisted during component renders. In other words, if you set the value to 2 in the ref, and the component re-renders, the value remains 2. If you change it to 3, and the component renders again, the value remains 3.

Changes to the "current" property DO NOT TRIGGER RENDERINGS IN COMPONENTS.

Because of these characteristics, we can use "ref" to persist values between renders, with the aim of avoiding unnecessary component re-renders when these values change.

A practical example of this use case is in the implementation of a timer:

```javascript
function Stopwatch() {
	const timerIdRef = useRef(0);
	const [count, setCount] = useState(0);

	const startHandler = () => {
		if (timerIdRef.current) {
			return;
		}
		timerIdRef.current = setInterval(() => setCount((c) => c + 1), 1000);
	};

	const stopHandler = () => {
		clearInterval(timerIdRef.current);
		timerIdRef.current = 0;
	};

	useEffect(() => {
		return () => clearInterval(timerIdRef.current);
	}, []);

	return (
		<div>
			<div>Timer: {count}s</div>
			<div>
				<button onClick={startHandler}>Start</button>
				<button onClick={stopHandler}>Stop</button>
			</div>
		</div>
	);
}
```

We use "timerIdRef" to store the "setInterval" value. Notice that we don't need to render the component every time we start or stop the timer, which means every time we change the "setInterval." With "ref," this is possible. If we used "useState" to store the "setInterval," every start and stop action would cause a component re-render.

Now, let's move on to the most common use case for front-end developers: directly manipulating DOM elements using "useRef." When you pass "useRef" to an element, React places a reference to that element in the "current" property of the ref as soon as the element is mounted. Through this reference, we can imperatively change the value, give focus, or play something on any DOM node. This is the correct way to directly manipulate the DOM using React.

Using DOM API methods directly (such as "document.getElementById," "document.getSomething") can interfere with React's rendering because the browser's API may not always notify React about changes, leading to unpredictable behavior. Let's dive into an example of using "useRef" on a DOM element:

```javascript
import { useRef, useEffect } from 'react';

function InputFocus() {
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return <input ref={inputRef} type="text" />;
}
```

In the example above, we are giving focus to the input as soon as the component is initially rendered. Notice that we access the input's API through "useRef." You can also use the same ref to retrieve the current value of the input, like "inputRef.current.value." Pretty cool, right? These cases are the most common for front-end developers.

We can access the input's value with the ref because HTML form elements have a unique feature: they have their own internal state. That's why we don't need to set its value at any point; we can simply retrieve it. This approach has the advantage of performance and simplicity, but it can be more challenging to monitor changes in this state to apply validations, for example. As a side note, this approach is used by libraries like [React Hook Form](https://www.react-hook-form.com)

Refs are the correct way to imperatively manipulate DOM elements, but remember that React is, by nature, declarative. This means that we should always try to solve problems through state and by declaring what happens when it changes.
