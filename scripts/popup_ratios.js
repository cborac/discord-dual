const root = document.documentElement;
window.ratio = { // Modules smh
     picSize: (80 / 300),
     picOffset: (22 / 300)
}

root.style.setProperty('--picOffset', (16 / 300) * 50 + "vw");
root.style.setProperty('--picWidth', (80 / 3) + "%");
root.style.setProperty('--picHeight', (80 / 1.25) + "%");