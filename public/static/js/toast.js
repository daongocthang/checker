// Toast message
function toast({ message = '', type = 'success' }) {
    const root = $('#toast');
    const duration = 5000;

    if (!root) return;

    const toast = $('<div>');

    const autoRemoveId = setTimeout(function () {
        toast.remove();
    }, duration + 1000);

    toast.click(function (ev) {
        if (ev.target.closest('.toast__close')) {
            toast.remove();
            clearTimeout(autoRemoveId);
        }
    });

    const delay = (duration / 1000).toFixed(2);

    toast.attr('style', `animation: slideLeft ease 0.5s, fadeOut linear 1s ${delay}s forwards;`);

    toast.addClass(`custom-toast toast--${type}`);

    toast.html(`  
      <div class="toast__body">
        <span>${message}</span>
      </div>
      <div class="toast__close">
        <i class="fa fa-times"></i>
      </div>  
    `);

    toast.appendTo(root);
}
