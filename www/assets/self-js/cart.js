var id_menu_clicked = 0;
$(document).ready(function () {
    $.ajax({
            type: "get",
            url: "http://frozenbits.tech/foodCashier/index.php/C_Cart/getAllItem",
            beforeSend: function () {

            },
            success: function (dataObjects) {
                console.log(dataObjects);
                Object.entries(dataObjects.result).forEach(([key, dataObject]) => {
                    var appendList =
                        `
                    <div class="row m-2" data-rowid=`+dataObject.rowid+`>
                        <div class="card col-12 bg-dark text-light" style="width: 18rem;">
                            <div class="card-body" >
                                <h5 class="card-title">`+ dataObject.name + `</h5>
                                <p class="card-text">ID Menu: `+ dataObject.id + `</p>
                                <p class="card-text">Kuantitas: `+ dataObject.qty + `</p>
                                <p class="card-text">Harga: `+ dataObject.price + `</p>
                                <p class="card-text">Subtotal: `+ dataObject.subtotal + `</p>
                                <p class="card-text">Catatan: `+ dataObject.options.note + `</p>
                                
                                
                                
                            </div>
                        </div>
                    </div>
                    `;

                    $('#listcart').append(appendList);
                });
                    
                $('#total span').html(dataObjects.total);
                
                $('#getPoin span').html(Math.floor(dataObjects.total/300000)*10000);

            },
            complete: function () {

            }
        });


    $(document).on('click', '#menu', function () {
        var title = $(this).siblings('h5').text();
        $('#modalTitle').text(title);
        id_menu_clicked = $(this).data('idmenu');



    });


    $(document).on('click', '#getCart', function () {
       

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
        $("#listcart .row").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});