const root = document.documentElement;
window.ratio = {
     picSize: (120 / 600),
     picOffset: (22 / 600)
}

root.style.setProperty('--picOffset', (16 / 600) * 50 + "vw");
root.style.setProperty('--picWidth', (136 / 6) + "%");
root.style.setProperty('--picHeight', (136 / 2.5) + "%");