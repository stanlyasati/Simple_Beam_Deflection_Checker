// JavaScript code for calculations
document.getElementById("calculate").addEventListener("click", function() {
    // Get the values from the inputs
    const length = parseFloat(document.getElementById("length").value);
    const breadth = parseFloat(document.getElementById("breadth").value) / 1000; // Convert mm to meters
    const height = parseFloat(document.getElementById("height").value) / 1000; // Convert mm to meters
    const load = parseFloat(document.getElementById("load").value);
    const fcu = parseFloat(document.getElementById("fcu").value);
    const fy = parseFloat(document.getElementById("fy").value);

    // Calculate Elasticity
    const elasticity = 5000 * Math.sqrt(fcu);

    // Calculate Inertia
    const inertia = (breadth*1000 * (Math.pow(height*1000, 3))) / 12;

    // Calculate Moment of Resistance (ULS)
    const momentResistance = (load * Math.pow(length, 2)) / 8;

    // Calculate Shear Capacity (ULS)
    const shearCapacity = load * length / 2;

    // Calculate Deflection, δ Actual (SLS)
    const deflectionActual = (5 * load * Math.pow(length*1000, 4)) / (384 * elasticity * inertia);

    // Calculate Deflection, δ Limits (SLS)
    const deflectionLimits = length * 1000 / 250;

   // Update the summary paragraph
try {
    // Check if any of the input fields are empty
    if (!length || !breadth || !height || !load || !fcu || !fy) {
        throw new Error("Empty input fields");
    }

    let summaryText = "Here the Deflection, δ Actual (SLS): " + deflectionActual.toFixed(2) + " is ";
    if (deflectionActual < deflectionLimits) {
        summaryText += "< ";
    } else if (deflectionActual === deflectionLimits) {
        summaryText += " = ";
    } else {
        summaryText += " > ";
    }
    summaryText += "Deflection, δ Limits (SLS): " + deflectionLimits.toFixed(2) + ". Therefore, the ";
    summaryText += (deflectionActual <= deflectionLimits) ? "Deflection is OK." : "Deflection Exceeds Limit, thus, Increase the Section's Depth.";
    document.getElementById("summary").textContent = summaryText;
} catch (error) {
    console.error(error);
    document.getElementById("summary").textContent = "** ERROR!!! PLEASE CHECK INPUTS!!! **";
}

});

document.getElementById("export2pdf").addEventListener("click", function() {
    console.log("Export button clicked"); // Debugging: Check if the export button is clicked
    
    var printContent = document.getElementById("printpd").innerHTML;
    console.log("Print content:", printContent); // Debugging: Check if printContent is retrieved correctly
    
    var originalContent = document.body.innerHTML;
    console.log("Original content:", originalContent); // Debugging: Check if originalContent is retrieved correctly
    
    document.body.innerHTML = printContent;
    console.log("Content replaced with print content:", document.body.innerHTML); // Debugging: Check if content is replaced correctly
    
    window.print();
    console.log("Printing..."); // Debugging: Check if printing is triggered
    
    document.body.innerHTML = originalContent;
    console.log("Content restored:", document.body.innerHTML); // Debugging: Check if content is restored correctly
});
