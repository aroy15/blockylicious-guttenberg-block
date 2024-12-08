export const parseValue = (value) => {
	if(value.indexOf("var:") === 0){
		//Current input is var:preset|spacing|40
		const varValue = value.split(":")[1].split("|").join("--")
		// The result is preset--spacing--40
		return `var(--wp--${varValue})`;
	}

	return value;
}