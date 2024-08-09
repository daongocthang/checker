$('#frmSearch').on('submit', (ev) => {
    ev.preventDefault();
    const data = $('#frmSearch').serialize();
    $('table tbody').empty();
    $.ajax({
        url: '/api/v1/trans',
        method: 'put',
        data,
        beforeSend: () => {
            $('#loader').modal('show');
        },
        success: (res) => {
            const { data, checked } = res;
            const attr = data.expired ? 'danger' : 'success';
            const val = data.expired ? 'hết bh' : 'còn bh';
            const markup = `<tr>
            <td class="align-middle">${data.id}</td>
            <td class="align-middle">${data.model}</td>
            <td class="align-middle">${data.serial}</td>            
            <td class="align-middle text-primary font-weight-bold text-center text-uppercase">${data.suggestion}</td>
            <td class="align-middle  text-center">
                <div class="badge badge-${attr} text-uppercase badge--align">${val}</div>
            </td>
            </tr>`;
            $('table tbody').append(markup);
            $('#checked').text(checked);
        },
        error: (xhr, status, msg) => {
            if (xhr.status === 401) {
                location.href = '/';
            } else {
                const markup = `<tr>
                <td colspan="5" class="text-center text-danger">Không tìm thấy dữ liệu</td>
                </tr>`;
                $('table tbody').append(markup);
            }
        },
        complete: () => {
            $('#loader').modal('hide');
            $('input[type="search"]').select();
        },
    });
});

$('#migration').click(() => {
    dialog.show('Chuyển đổi dữ liệu', 'Bạn có muốn chuyển dữ liệu không?', 'primary', () => {
        $.ajax({
            url: '/api/v1/trans/migrates',
            type: 'post',
            beforeSend: () => {
                $('#loader').modal('show');
                $('#dialog').modal('hide');
            },
            success: (res) => {
                toast(res);
            },
            error: (err) => {
                toast(err.responseJSON);
            },
            complete: () => {
                $('#loader').modal('hide');
            },
        });
    });
});

$('#suggest').click(() => {
    var root = $('#suggest').parents('.input-group');
    var inverse = root.find('input[type="checkbox"]').is(':checked');
    var count = root.find('input[type="text"]').val();
    var msg = $('#suggestMsg');
    const formData = { inverse, count };

    $.ajax({
        url: 'api/v1/trans/suggests',
        data: formData,
        type: 'post',
        beforeSend: () => {
            $('#loader').modal('show');
        },
        complete: () => {
            $('#loader').modal('hide');
            msg.removeClass('d-none');
        },
        success: (res) => {
            msg.text(`[ ${new Date().toLocaleString()} ] Cập nhật thành công`);
        },
        error: () => {
            msg.text(`[ ${new Date().toLocaleString()} ] Không tìm thấy dữ liệu`);
        },
    });
});
