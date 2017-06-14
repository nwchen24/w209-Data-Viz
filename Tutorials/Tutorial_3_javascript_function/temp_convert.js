// Function to convert to F or C depending on input

function temp_convert_func(temp_input){

	//get last letter (C or F).
	var scale = temp_input.slice(-1);
	//get numerical temp.
	var numerical_temp = temp_input.slice(0, - 1);
	
	//deal with celsius
	if (scale === "C") {
		return Math.round((1.8 * numerical_temp + 32)) + "F"
	} 
		
	//deal with farenheit
	if (scale === "F") {
		return Math.round((numerical_temp - 32)/1.8) + "C"
	} 
}

// Function to display the opposite scale depending on input
function scale_for_heading(temp_input){

	//get last letter (C or F).
	var scale = temp_input.slice(-1);

	//deal with celsius
	if (scale === "C") {
		return "Your Temperature Converted to F Is:"
	} 
		
	//deal with farenheit
	if (scale === "F") {
		return "Your Temperature Converted to C Is:"
	} 
}

