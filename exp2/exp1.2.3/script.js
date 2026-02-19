const svg = document.getElementById("svg");
const color = document.getElementById("color");
const undo = document.getElementById("undo");
let drawing = false, path, paths=[];

svg.onmousedown = e => {
  drawing = true;
  path = document.createElementNS("http://www.w3.org/2000/svg","path");
  path.setAttribute("stroke", color.value);
  path.setAttribute("fill","none");
  path.setAttribute("d", `M ${e.offsetX} ${e.offsetY}`);
  svg.appendChild(path);
  paths.push(path);
};

svg.onmousemove = e => {
  if (!drawing) return;
  path.setAttribute("d", path.getAttribute("d") + ` L ${e.offsetX} ${e.offsetY}`);
};

svg.onmouseup = () => drawing = false;

undo.onclick = () => {
  const p = paths.pop();
  if (p) svg.removeChild(p);
};
