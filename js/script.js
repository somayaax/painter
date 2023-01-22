const canvas = document.getElementById("cvs")
canvas.style.backgroundColor = 'white'
const ctx = canvas.getContext('2d');
let icons = document.querySelectorAll('.icon');
let transparentBg = true;
document.getElementById('fill').value = '#ffffff'

canvas.removeEventListener("mousedown", mouseDown);
canvas.removeEventListener("mouseup", mouseUp);
canvas.removeEventListener("mousemove", mouseMove);
let id;
icons.forEach((icon) => {
    icon.addEventListener('click', () => {
        for (let i = 0; i < 5; i++) {
            icons[i].classList.remove('active')
        }
        icon.classList.add('active');
        id = icon.id
        canvas.addEventListener("mousedown", mouseDown);
        canvas.addEventListener("mousemove", mouseMove);
        canvas.addEventListener("mouseup", mouseUp);
    })
})
let drawFlag = false;
let sp = { x: 0, y: 0 };
let ep = { x: 0, y: 0 };
let width = 0;
let height = 0;
let r = 0;
function mouseDown(e) {
    ctx.beginPath();
    ctx.strokeStyle = document.getElementById('stroke').value;
    ctx.fillStyle = document.getElementById('fill').value;
    if (transparentBg) {
        ctx.fillStyle = '#ffffff00';
    }
    sp.x = e.offsetX;
    sp.y = e.offsetY;
    drawFlag = true;
    if (id !== 'circle') {
        ctx.moveTo(sp.x, sp.y);
    }
}

function mouseMove(e) {
    ep.x = e.offsetX;
    ep.y = e.offsetY;
    ctx.lineWidth = '2'
    if (id === 'freehand' && drawFlag) {
        ctx.lineTo(ep.x, ep.y);
        ctx.lineWidth = '0.4'
        ctx.stroke();
    } else if (id === 'rect' && drawFlag) {
        width = ep.x - sp.x;
        height = ep.y - sp.y;
    } else if (id === 'erase' && drawFlag) {
        ctx.strokeStyle = canvas.style.backgroundColor;
        ctx.fillStyle = canvas.style.backgroundColor;
        ctx.lineWidth = '30';
        ctx.lineTo(ep.x, ep.y);
        ctx.stroke();
    }
}

function mouseUp(e) {
    drawFlag = false
    if (id === 'line') {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (id === 'rect') {
        ctx.rect(sp.x, sp.y, width, height);
        ctx.fillRect(sp.x, sp.y, width, height)
        ctx.stroke()
        width = 0;
        height = 0;
    } else if (id === 'circle') {
        let p1 = ep.x - sp.x;
        let p2 = ep.y - sp.y;
        r = Math.sqrt(p1 ** 2 + p2 ** 2);
        ctx.arc(sp.x, sp.y, r, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke();
        r = 0;
    }
}
let btn = document.getElementById('btn');
btn.addEventListener("click", () => {
    transparentBg = true;
    btn.classList.add('active');
    document.getElementById('fill').value = '#ffffff'  
})
document.getElementById('fill').addEventListener("click", () => {
    transparentBg = false;
    btn.classList.remove('active')
})