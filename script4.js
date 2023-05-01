function drawGraph() {
    // Get input values
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const maxValue = parseFloat(document.getElementById("maxValue").value);

    // Check input values
    if (isNaN(inputValue) || isNaN(maxValue)) {
        alert("Please enter valid numbers.");
        return;
    } else if (inputValue > maxValue) {
        alert("Input Value cannot be greater than Max Value.");
        return;
    }

    // Draw vertical bar graph
    drawVerticalBarGraph(inputValue, maxValue);

    // Draw pie chart
    drawPieChart(inputValue, maxValue);
}

function drawVerticalBarGraph(inputValue, maxValue) {
    // Get canvas element and context
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    // Set canvas width and height
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set bar width and spacing
    const barWidth = 50;
    const barSpacing = 10;

    // Calculate bar heights
    const inputBarHeight = (inputValue / maxValue) * (height - 50);
    const maxBarHeight = height - 50;
    const inputBarPercentage = Math.round((inputValue / maxValue) * 100);
    const maxBarPercentage = 100;

    // Set initial x and y coordinates for drawing bars
    let x = (width - (barWidth * 2) - barSpacing) / 2;
    let y = height - 50;

    // Draw bars
    ctx.fillStyle = "skyblue";
    ctx.fillRect(x, y - maxBarHeight, barWidth, maxBarHeight);
    ctx.fillStyle = "lightblue";
    ctx.fillRect(x, y - inputBarHeight, barWidth, inputBarHeight);
    // Draw bar labels
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("0%", x, y + 15);
    ctx.fillText(`${maxBarPercentage}%`, x + barWidth + barSpacing, y + 15);
    ctx.fillText(`${inputBarPercentage}%`, x, y - inputBarHeight - 5);
}
function drawPieChart(inputValue, maxValue) {
    // Get canvas element and context
    const canvas = document.getElementById("myPieChart");
    const ctx = canvas.getContext("2d");

    // Set canvas width and height
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set radius and center coordinates
    const radius = Math.min(width, height) / 2 - 10;
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate start and end angles for input value
    const inputAngleStart = -Math.PI / 2;
    const inputAngleEnd = inputAngleStart + (2 * Math.PI * (inputValue / maxValue));

    // Draw input value segment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, inputAngleStart, inputAngleEnd,true);
    ctx.closePath();
    ctx.fillStyle = "skyblue";
    ctx.fill();

    // Draw remaining value segment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, inputAngleEnd, inputAngleStart, true);
    ctx.closePath();
    ctx.fillStyle = "lightblue";
    ctx.fill();

    // Draw chart label
    const inputPercentage = Math.round((inputValue / maxValue) * 100);
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${inputPercentage}%`, centerX, centerY + 5);
}  