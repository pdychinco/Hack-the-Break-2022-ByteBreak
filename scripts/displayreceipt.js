function toggle(id) {
    var x = document.getElementById(id);
    if (x.style.visibility === 'hidden') {
      x.style.visibility = 'visible';
    } else {
      x.style.visibility = 'hidden';
    }
}

function hide(id) {
    document.getElementById("#"+id).style.visibility="hidden";
}