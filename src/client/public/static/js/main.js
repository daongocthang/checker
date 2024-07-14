const onUploadHandler = () => {
    const form = $('#modal form');
    if (!form) return;

    const input = form.find('input')[0];
    formData = new FormData();
    formData.append('file', input.files[0]);

    modal.submit({
        url: form.attr('action'),
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        beforeSend: () => {
            modal.dismiss();
            if (input.files[0]) $('#loader').modal('show');
        },
    });
};
