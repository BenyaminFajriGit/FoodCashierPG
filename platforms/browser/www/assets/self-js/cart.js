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
                                <p class="card-text">Kuantitas: `+ dataObject.qty + `</p>
                                <p class="card-text">Harga: `+ dataObject.price + `</p>
                                <p class="card-text">Subtotal: `+ dataObject.subtotal + `</p>
                                <p class="card-text">Catatan: `+ dataObject.options.note + `</p>
                                <button class="btn btn-danger" id="hapus" data-rowid=`+dataObject.rowid+`>Hapus</button>
                                
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



    
    $(document).on('click', '#hapus', function () {
        var rowid = $(this).data('rowid');
        console.log(rowid);
        
        $.ajax({
            type: "get",
            url: "http://frozenbits.tech/foodCashier/index.php/C_Cart/delete_cart_item/"+rowid,
            beforeSend: function () {

            },
            success: function (dataObjects) {
                if(dataObjects.status==true)
                location.reload();
               

            },
            complete: function () {

            }
        });
    });

    $(document).on('click', '#checkout', function () {
        var username = $('#username').val();
        var is_member=false;
        if(username){
            $.ajax({
            type: "get",
            url: "http://frozenbits.tech/foodCashier/index.php/C_Pelanggan/getPelanggan/"+username,
            beforeSend: function () {

            },
            success: function (dataObjects) {
                if(dataObjects.status==true)
                is_member=true;
               

            },
            complete: function () {

            }
        });
        
        }else{
            username="";
        }
        $.ajax({
            type: "post",
            url: "http://frozenbits.tech/foodCashier/index.php/C_Transact/checkout/",
            data: {username_pelanggan:username,username_staff:'benz'},
            beforeSend: function () {

            },
            success: function (dataObjects) {
                console.log(dataObjects);
                if(dataObjects.status==true)
                window.location.href = "invoice.html?id_invoice="+dataObjects.id_invoice;
                else{
                    alert(dataObjects.message);
                }
               

            },
            complete: function () {

            }
        });
        
    });

    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#listcart .row").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});