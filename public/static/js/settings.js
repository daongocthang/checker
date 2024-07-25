function fetch(s) {
    $('table').empty();
    $('#error').text('');
    $.ajax({
        url: s,
        type: 'get',
        beforeSend: () => {
            $('#loader').modal('show');
        },
        success: (res) => {
            if (res.length == 0) {
                $('#error').text('No Data Found');
                return;
            }
            const heads = Object.keys(res[0]).map((elem) => `<th>${elem}</th>`);
            $('table').append(`<thead><tr>${heads.join()}</tr></thead>`);
            const rows = [];
            for (let i = 0; i < res.length; i++) {
                const item = res[i];
                let markup = Object.values(item).reduce((acc, curr) => {
                    if (isNumber(curr)) curr = curr.toLocaleString();
                    return acc + `<td>${curr}</td>`;
                }, '');
                rows.push(`<tr>${markup}</tr>`);
            }
            $('table').append(`<tbody><tr>${rows}</tr></tbody>`);
        },
        complete: () => {
            $('#loader').modal('hide');
        },
    });
}

function del(url, sel) {
    dialog.show('Xóa dữ liệu', 'Bạn có muốn xóa tất cả dữ liệu không?', 'danger', () => {
        $.ajax({
            url,
            type: 'delete',
            beforeSend: () => {
                $('#loader').modal('show');
                $('#dialog').modal('hide');
            },
            success: (res) => {
                toast(res);
                $('table').empty();
                $('#error').text('No Data Found');
                $(sel).parents('.card').find('h1').text('0');
            },
            error: (err) => {
                toast(err.responseJSON);
            },
            complete: () => {
                $('#loader').modal('hide');
            },
        });
    });
}
