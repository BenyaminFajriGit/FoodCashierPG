let parseStorage = [];
let InvoiceUtils = {
    parseGet: function () {
        let query = window.location.search.substring(1);
        let parms = query.split('&');
        for (var i = 0; i < parms.length; i++) {
            var pos = parms[i].indexOf('=');
            if (pos > 0) {
                var key = parms[i].substring(0, pos);
                var val = parms[i].substring(pos + 1);
                parseStorage[key] = val;
            }
        }
    },
    getObjects: function (id_invoice) {
        $(window).load('pageinit', '', function () {
            $.ajax({
                url: `http://frozenbits.tech/foodCashier/C_Transact/showDetailInvoice/${id_invoice}`,
                type: 'get',
                beforesend: function () {

                },
                success: function (dataObject) {
                    console.log(dataObject);

                    let col_length = 5; //set col-length according to your need

                    //set the invoice identifier data
                    let data_placeholder = `
                        <p><div class="row">
                            <div class="col-${col_length}">Name</div>
                            <div class="mr-1">:</div>
                            <div id="invoiceName">${dataObject.invoice.username_pelanggan}</div>
                        </div>
                        <div class="row">
                            <div class="col-${col_length}">Invoice ID</div>
                            <div class="mr-1">:</div>
                            <div id="invoiceID">${dataObject.invoice.id_invoice}</div>
                        </div>
                        <div class="row">
                            <div class="col-${col_length}">Date</div>
                            <div class="mr-1">:</div>
                            <div id="invoiceDate">${dataObject.invoice.tanggal}</div>
                        </div></p>
                    `;
                    $("#invoiceData").append(data_placeholder);

                    //populate the page
                    dataObject.orders.forEach(dataElement => {
                        //console.log(dataElement)
                        let appendList = `
                        <div class="card bg-dark text-light mb-2" >
                            <div class="card-body" >
                                <h5 class="card-title">` + dataElement.nama + `</h5>
                                <div class="row">
                                    <div class="col-${col_length}">Kuantitas</div>
                                    <div class="mr-1">:</div>
                                    <div>${dataElement.kuantitas}</div>
                                </div>
                                <div class="row">
                                    <div class="col-${col_length}">Harga Satuan</div>
                                    <div class="mr-1">:</div>
                                    Rp<div>${dataElement.harga}</div>
                                </div>
                                <div class="row">
                                    <div class="col-${col_length}">Subtotal</div>
                                    <div class="mr-1">:</div>
                                    Rp<div id="invoiceID">${dataElement.subtotal}</div>
                                </div>
                                <div class="row">
                                    <div class="col-${col_length}">Catatan</div>
                                    <div class="mr-1">:</div>
                                    Rp<div>${dataElement.catatan}</div>
                                </div>
                            </div>
                        </div>
                    `
                        $("#invoiceDetails").append(appendList);
                    })

                    //populate the payment details
                    let payment_placeholder = `
                        <p><div class="row">
                            <div class="col-${col_length}">Subtotal</div>
                            <div class="mr-1">:</div>
                            Rp<div id="subtotal">${dataObject.invoice.total}</div>
                        </div>
                        <div class="row">
                            <div class="col-${col_length}">Potongan Harga</div>
                            <div class="mr-1">:</div>
                            Rp<div id="potonganHarga">${dataObject.invoice.potongan}</div>
                        </div>
                        <div class="row">
                            <div class="col-${col_length}">Harga Total</div>
                            <div class="mr-1">:</div>
                            Rp<div id="hargaTotal">${dataObject.invoice.setelah_potongan}</div>
                    </div></p>
                    `;
                    $("#invoicePayment").append(payment_placeholder);
                },
                error: function (err) {
                    console.log(err);
                },
                complete: function () {

                }
            })
        })
    }
}

//execute if GET parameters exists (which it should be)
if (location.search != "") {
    //console.log(window.location.search) //check available params
    InvoiceUtils.parseGet();

    let id_invoice = parseStorage['id_invoice'];
    //console.log(parseStorage['id_invoice']) //check id_invoice value

    InvoiceUtils.getObjects(id_invoice); //execute data pulling from API

    $(document).on("click", "#buttonBayar", function () {
        $("#hitungBayar").fadeIn().attr("class", "d-block")
        $("#buttonBayar").fadeOut() //attr("class","d-none")
    })
    $(document).ready(function () {
        $("#hitungBayar").trigger("reset");
        let kembalian;
        $("#paymentInput").on("input", function () {
            let paymentInput = parseInt($("#paymentInput").val());
            let hargaTotal = parseInt($("#hargaTotal").text());
            kembalian = paymentInput - hargaTotal;
            $("#jumlahUangKembalian").text(kembalian);
        })
        $("#paymentInput").on("change", function () {
            if (kembalian < 0) {
                $("#buttonSelesai").removeAttr("href");
                $("#buttonSelesai").off("click").on("click", function () {
                    alert("Uang yang dibayarkan masih kurang!");
                })
            } else {
                $("#buttonSelesai").attr("href", "index.html");
                $("#buttonSelesai").off("click")
            }
        })
    })
}