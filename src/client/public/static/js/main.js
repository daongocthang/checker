const uploadXlsxFile = (url, files) => {
    const formData = new FormData();
    formData.append('file', files[0]);
    console.log(url);
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
            toast({ type: 'success', ...res });
        },
        error: (jqXHR, textStatus, errorThrown) => {
            const err = JSON.parse(jqXHR.responseText);
            toast({ type: 'error', ...err });
        },
        complete: () => {
            $('#loader').modal('hide');
        },
    });
};
