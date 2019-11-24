$.ajax({
    url: `http://frozenbits.tech/foodCashier/C_Transact/getAllInvoice`,
    type: 'get',
    beforesend: function () {

    },
    success: function (dataObject) {
        console.log(dataObject);

        let col_length = 5; //set col-length according to your need

        //set the invoice identifier data
        dataObject.result.forEach(dataElement => {
            let data_placeholder = `
                <div class="card bg-dark text-light mb-2" >
                   <div class="card-body" >
                        <p><div class="row">
                            <div class="col-${col_length}">ID Invoice</div>
                            <div class="mr-1">:</div>
                            <div class="invoice_metadata">${dataElement.id_invoice}</div>
                        </div>
                        <div class="row">
                            <div class="col-${col_length}">Tanggal</div>
                            <div class="mr-1">:</div>
                            <div class="invoice_metadata">${dataElement.tanggal}</div>
                        </div>
                        <div class="row">
                            <div class="col-${col_length}">Harga Total</div>
                            <div class="mr-1">:</div>
                            <div class="invoice_metadata">${dataElement.total}</div>
                        </div>
                        <div class="row">
                            <div class="col-${col_length}">Nama Member</div>
                            <div class="mr-1">:</div>
                            <div class="invoice_metadata">${dataElement.username_pelanggan}</div>
                        </div></p>
                        <div class="row">
                            <a href="invoice.html?id_invoice=${dataElement.id_invoice}" class="btn bg-light btn-lg offset-5 col-6">Buka Invoice</a>
                        </div>
                    </div>
                </div>
            `;
            $("#invoiceData").append(data_placeholder);
        })
    }
})
$(document).ready(function () {
    $("#search").val("")
    $("#search").on("input", function () {
        var value = $(this).val().toLowerCase();
        $("#invoiceData .card").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
})