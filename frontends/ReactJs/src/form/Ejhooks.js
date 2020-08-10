import React, { useState } from 'react';

export default function Simple() {
	const [valor, setValor] = useState(0);
	return(
		<div>
			{valor}
			<button onClick={()=>setValor(valor + 1)}>Boton</button>
		</div>
	);
};