/* 
 Modal controller
Prerequisite: Bootstrap
*/
$('.btn-modal').click(function (ev) {
    modal.show($(this).data());
});

const modal = {
    show: function ({ title, body, submit, afterLoad }) {
        const btSubmit = $('#modal .modal-footer').children().last();

        btSubmit.removeClass();
        btSubmit.addClass(submit.class);
        btSubmit.text(submit.text);

        $('#modal .modal-title').text(title);

        $('#modal .modal-body').load(body, function () {
            if (afterLoad instanceof Function) afterLoad();

            $('#modal').modal({ show: true });
        });

        btSubmit.off('click');
        btSubmit.on('click', function () {
            if (window[submit.handler] instanceof Function) {
                window[submit.handler]();
            }
        });
    },
    dismiss: function () {
        $('#modal').modal('hide');
    },
    submit: function (settings, then, except) {
        $.ajax({
            beforeSend: function () {
                $('#modal').modal('hide');
            },
            success: function (res) {
                toast(res);
                if (then instanceof Function) then(res);
            },
            error: function (err) {
                toast(err.responseJSON);
                if (except instanceof Function) except(err);
            },
            complete: function () {
                $('#loader').modal('hide');
            },
            ...settings,
        });
    },
};

const dialog = {
    show: function (title, content, type, handler) {
        const tvTile = $('#dialog .modal-title');
        const tvContent = $('#dialog .modal-body');
        const btSubmit = $('#dialog .modal-footer').children().last();

        tvTile.removeClass();
        tvTile.addClass('text-' + type);

        btSubmit.removeClass();
        btSubmit.addClass('btn btn-' + type);

        tvTile.text(title);
        tvContent.text(content);

        btSubmit.off('click');
        btSubmit.on('click', () => {
            if (handler instanceof Function) {
                handler();
            }
        });

        $('#dialog').modal({ show: true });
    },
    dismiss: function () {
        $('#dialog').modal('hide');
    },
};
