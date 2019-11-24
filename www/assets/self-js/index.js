var id_menu_clicked = 0;
$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "http://frozenbits.tech/foodCashier/index.php/C_Menu/getallmenu",
        beforeSend: function () {

        },
        success: function (dataObjects) {
            dataObjects['result'].forEach(dataObject => {
                var appendList =
                    `
                    <div class="row m-2 ">
                        <div class="card col-12 bg-dark text-light" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">`+ dataObject.nama + `</h5>
                                <p class="card-text">Harga: `+ dataObject.harga + `</p>
                                <p class="card-text">Kategori: `+ dataObject.kategori + `</p>
                                <p class="card-text">Stok: `+ dataObject.stok + `</p>
                                <button id=menu type="button" class="btn btn-primary" data-idmenu=`+ dataObject.id_menu + ` data-toggle="modal" data-target="#exampleModalCenter">
                                  BUY
                                </button>
                            </div>
                        </div>
                    </div>
                    `;

                $('#listmenu').append(appendList);
            });

        },

        complete: function () {

        }
    });


    $(document).on('click', '#menu', function () {
        var title = $(this).siblings('h5').text();
        $('#modalTitle').text(title);
        id_menu_clicked = $(this).data('idmenu');



    });

    $(document).on('click', '#addCart', function () {
        var kuantitas = $('#kuantitas').val();
        var catatan = $('#catatan').val();
        if (catatan == "") {
            catatan = "-";
        }
        console.log(kuantitas);
        console.log(id_menu_clicked);
        console.log(catatan);
        $.ajax({
            type: "post",

            data: { "id_menu": id_menu_clicked, "kuantitas": kuantitas, "catatan": catatan },
            url: "http://frozenbits.tech/foodCashier/index.php/C_Cart/addItem",
            beforeSend: function () {

            },
            success: function (dataObjects) {
                console.log(dataObjects);
               alert('s');
                $('#catatan').val('-');
                $('#kuantitas').val(1);
                $('#exampleModalCenter').modal('hide');
            },
            complete: function () {

            }
        });

    });

    $(document).on('click', '#getCart', function () {
        $.ajax({
            type: "get",
            url: "http://frozenbits.tech/foodCashier/index.php/C_Cart/getAllItem",
            beforeSend: function () {

            },
            success: function (dataObjects) {
                console.log(dataObjects.result);
                $('#cart').html('');
                Object.entries(dataObjects.result).forEach(([key, dataObject]) => {
                    var appendList =
                        `
                    <div class="row m-2">
                        <div class="card col-12" style="width: 18rem;">
                            <div class="card-body">
                                <p class="card-text">`+ dataObject.rowid + `</p>
                                <h5 class="card-title">`+ dataObject.id + `</h5>
                                <p class="card-text">`+ dataObject.name + `</p>
                                <p class="card-text">`+ dataObject.qty + `</p>
                                <p class="card-text">`+ dataObject.price + `</p>
                                <p class="card-text">`+ dataObject.subtotal + `</p>
                                <p class="card-text">`+ dataObject.options.note + `</p>
                                
                                
                                
                            </div>
                        </div>
                    </div>
                    `;

                    $('#cart').append(appendList);
                });



            },
            complete: function () {

            }
        });

    });

    $(document).on('click', '#add', function () {
        var kuantitas = $('#kuantitas').val();
        kuantitas = parseInt(kuantitas);
        if (kuantitas < 100) {
            $('#kuantitas').val(++kuantitas);
        }

    });
    $(document).on('click', '#minus', function () {
        var kuantitas = $('#kuantitas').val();
        kuantitas = parseInt(kuantitas);
        if (kuantitas > 0) {
            $('#kuantitas').val(--kuantitas);
        }

    });

    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#listmenu .row").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});