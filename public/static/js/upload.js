const uploadXlsxFile = (url, sel) => {
    const formData = new FormData();
    formData.append('file', sel.files[0]);
    $.ajax({
        url,
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        beforeSend: () => {
            $('#loader').modal('show');
        },
        success: (res) => {
            if (res.count) {
                $(sel).parents('.card').find('h1').text(res.count);
                $('#total').text('+' + res.count);
            }

            toast({ type: 'success', message: res.message });
        },
        error: (jqXHR, textStatus, errorThrown) => {
            const err = JSON.parse(jqXHR.responseText);
            toast({ type: 'error', ...err });
        },
        complete: () => {
            $('#loader').modal('hide');
            sel.value = null; // change event not working if old value
        },
    });
};
