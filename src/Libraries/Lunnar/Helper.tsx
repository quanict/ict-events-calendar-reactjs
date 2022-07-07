 
/* Discard the fractional part of a number, e.g., INT(3.2) = 3 */
export function toInt(d:number) {
	return Math.floor(d);
}