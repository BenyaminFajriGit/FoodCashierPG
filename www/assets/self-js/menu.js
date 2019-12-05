$(function () {
    $("#navbar").load("partial/navbar.html");
});

$(document).ready(function () {
    //tampilkan semua semua
    $.ajax({
        type: "get",
        url: "http://frozenbits.tech/foodCashier/index.php/C_Menu/getAllMenu",
        beforeSend: function () {
            console.log("dsadcsads"); //hapus
        },
        success: function (dataObjects) {
            console.log("dsadwdcsads"); //hapus
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
                                                             
                                <button onclick="modalChangeAttribute(`+dataObject.id_menu+`)" type="button" class="btn btn-warning" data-toggle="modal" data-target="#form-update"> 
                                Update </button> <!--//button buat tombol update-->
                                                                
                                <button onclick="detail('`+ dataObject.id_menu + `')" type="button" class="btn btn-warning" data-toggle="modal" data-target="#menu-detail"> 
                                Detail </button>
                                
                                <button onclick="delMenu('`+ dataObject.id_menu + `')" type="button" class="btn btn-warning"> 
                                Delete </button>
                            </div>
                        </div>
                    </div>
                    `;
                $('#listmenu').append(appendList);

            });
            console.log("fe2q3"); //hapus
        },

        complete: function () {

        }
    });
});
function modalChangeAttribute(id_menu){
    $('#btn-submit-update').attr("onclick","update("+id_menu+")")
}
function detail(id_menu) {
    $.ajax({
        type: "get",
        url: "http://frozenbits.tech/foodCashier/index.php/C_Menu/getByID/" + id_menu,
        beforeSend: function () {
        },
        success: function (dataObjects) {
            const { status, result } = dataObjects;
            if (status) {
                $('#detail-nama').text('Nama menu : ' + result.nama);
                $('#detail-harga').text('Harga : ' + result.harga);
                $('#detail-kategori').text('Kategori : ' + result.kategori);
                $('#detail-stock').text('Stock : ' + result.stok);
            }
        }
    })

}
function update(id_menu) {
    var nama = $('#form-nama-update').val();
    var harga = $('#form-harga-update').val();
    var kategori = $('#form-kategori-update').val();
    var stok = $('#form-kuantitas-update').val();
    $.ajax({
        type: "post",
        data: { "id_menu": id_menu, "nama": nama, "harga": harga, "kategori": kategori, "stok": stok },
        url: "http://frozenbits.tech/foodCashier/index.php/C_Menu/updateMenu/",
        beforeSend: function () {
            console.log("VARSLCT "+id_menu)
        },
        success: function (dataObjects) {
            console.log(dataObjects)
            $('#form-nama-update').val("");
            $('#form-nama-update').val(dataObjects.nama); //apa mending di-disable terus dimunculin nama menu yg mau diupdate?
            $('#form-harga-update').val();
            $('#form-kategori-update').val(dataObjects.kategori); //sama
            $('#form-kuantitas-update').val();
            window.location.reload(false)
        }

    })
}

function tambah() {
    var nama = $('#form-nama-tambah').val();
    var harga = $('#form-harga-tambah').val();
    var kategori = $('#inputGroupTambah').val();
    var stok = $('#form-kuantitas-tambah').val();
    console.log(nama + "" + harga)
    $.ajax({
        type: "post",
        data: { "nama": nama, "harga": harga, "kategori": kategori, "stok": stok },
        url: "http://frozenbits.tech/foodCashier/index.php/C_Menu/addMenu/", //apa kurang + id_menu ?
        beforeSend: function () {
        },
        success: function (dataObjects) {
            console.log(dataObjects) //hapus
            if (dataObjects.status == false) {
                alert(dataObjects.error_message);
            } else {
                console.log("1wrdawf"); //hapus
                $('#form-nama-tambah').val();
                $('#form-harga-tambah').val();
                $('#inputGroupTambah').val();
                $('#form-kuantitas-tambah').val();
                window.location.reload(false)
            }

        }
    });
}

function delMenu(id_menu) {
    console.log("dsadads"); //hapus
    $.ajax({
        type: "post",
        url: "http://frozenbits.tech/foodCashier/index.php/C_Menu/deleteMenu/" + id_menu,
        beforeSend: function () {

        },
        success: function (status) {
            console.log(status);
            if (status) {
                alert('Menu berhasil dihapus');
                window.location.reload();
            }
        }

    });
}