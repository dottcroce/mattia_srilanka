
function openLocation(localita) {
  window.location.href = `localita/${localita}.html`;
}


// Applica animazione marker se Leaflet è usato
if (typeof L !== 'undefined') {
    const originalIcon = L.Icon.Default.prototype.createIcon;
    L.Icon.Default.prototype.createIcon = function (oldIcon) {
        var icon = originalIcon.call(this, oldIcon);
        icon.classList.add("animated");
        return icon;
    };
}

// Gestione stelline
document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('.star');
  stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
      stars.forEach((s, i) => {
        if (i <= idx) {
          s.classList.add('selected');
        } else {
          s.classList.remove('selected');
        }
      });
    });
  });
});
