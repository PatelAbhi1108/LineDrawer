const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const points = [{ x: 0, y: 0 }];

// Set initial line width
const widthInput = document.getElementById('width');
widthInput.addEventListener('input', () => {
    ctx.lineWidth = widthInput.value;
    drawLines();
});

// Draw lines based on points array
function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
}

// Add random point
document.getElementById('add-random-point').addEventListener('click', () => {
    const randomX = Math.floor(Math.random() * canvas.width);
    const randomY = Math.floor(Math.random() * canvas.height);
    points.push({ x: randomX, y: randomY });
    drawLines();
});

// Add point from manual input
document.getElementById('add-manual-point').addEventListener('click', () => {
    const input = document.getElementById('manual-coord').value;
    const [x, y] = input.split(',').map(Number);
    if (!isNaN(x) && !isNaN(y)) {
        points.push({ x, y });
        drawLines();
    } else {
        alert('Please enter valid coordinates (e.g., "100,200")');
    }
});

// Add point by clicking on canvas
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    points.push({ x, y });
    drawLines();
});

// Initial line drawing
ctx.lineWidth = widthInput.value;
ctx.strokeStyle = "black";
drawLines();