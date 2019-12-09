$(function(){
    $("#navbar").load("partial/navbar.html"); 
  });

  $(document).ready(function () {
      //get all data members
      $.ajax({
          type: "get",
          url: "http://frozenbits.tech/foodCashier/index.php/C_Pelanggan/getPelanggan",
          beforeSend: function () {
          },
          success: function (dataObjects) {
              const {status, result} = dataObjects;
              
              if(status){
                  result.forEach(data => {
                      var appendList =
                          `
                          <div class="row m-2 ">
                              <div class="card col-12 bg-dark text-light" style="width: 18rem;">
                                  <div class="card-body">
                                      <h5 class="card-title">`+ data.username_pelanggan + `</h5>
                                      <p class="card-text">Nama: `+ data.nama + `</p>
                                      <button onclick="detail('` + data.username_pelanggan + `', true)" type="button" class="btn btn-warning" data-toggle="modal" data-target="#modal-form"> Edit </button>
                                      <button onclick="detail('` + data.username_pelanggan + `')" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-detail"> Detail </button>
                                      <button onclick="delUser('` + data.username_pelanggan + `')" type="button" class="btn btn-danger" > Delete </button>
                                  </div>
                              </div>
                          </div>
                          `;

                      $('#listmember').append(appendList);
                  });
              }

          }
      });

  });

  function detail(username, edit = false)
  {
      cleanForm(true);
      $.ajax({
          type: "get",
          url: "http://frozenbits.tech/foodCashier/index.php/C_Pelanggan/getPelanggan/" + username,
          beforeSend: function () {
          },
          success: function (dataObjects) {
              const {status, result} = dataObjects;
              if(status)
              {
                  if(edit)
                  {
                      $('#form-username').val(result.username_pelanggan);
                      $('#form-username').attr('disabled', true);
                      $('#form-nama').val(result.nama);
                      $('#form-no_hp').val(result.no_hp);
                      $('#btn-submit').attr('onclick', 'submit(true)');
                      $('#btn-submit').text('Update')
                  }else{
                      $('#detail-username').text('Usename : ' + result.username_pelanggan);
                      $('#detail-nama').text('Nama : ' + result.nama);
                      $('#detail-no_hp').text('No HP : ' + result.no_hp);
                      $('#detail-jml_point').text('Jumlah Point : ' + result.jml_point);
                  }
              }
          }
      });
  }

  function cleanForm(edit=false)
  {
      if(edit)
      {
        $('#modalTitle').text('Edit Data');
      }else{
        $('#modalTitle').text('Add Data');
      }

      $('#form-username').val('');
      $('#form-username').attr('disabled', false);
      $('#form-nama').val('');
      $('#form-no_hp').val('');
      $('#btn-submit').text('Save')
      $('#btn-submit').attr('onclick', 'submit()');
  }

  function submit(edit = false)
  {
      const username_pelanggan = $('#form-username').val();
      const nama = $('#form-nama').val();
      const no_hp = $('#form-no_hp').val();

      if(edit){
          $.ajax({
              type: "post",
              url: "http://frozenbits.tech/foodCashier/index.php/C_Pelanggan/actions/update_pelanggan/"+username_pelanggan,
              data: {
                  nama,
                  no_hp
              },
              beforeSend: function () {
              },
              success: function (status) {
                  if(status)
                  {
                      alert('Data berhasil diubah!');
                      window.location.reload();
                  }
              }
          });
      }else{
          $.ajax({
              type: "post",
              url: "http://frozenbits.tech/foodCashier/index.php/C_Pelanggan/actions/add_pelanggan",
              data: {
                  username_pelanggan,
                  nama,
                  no_hp
              },
              beforeSend: function () {
              },
              success: function (status) {
                  if(status)
                  {
                      alert('Data berhasil ditambahkan!');
                      window.location.reload();
                  }
              }
          });
      }
  }

  function delUser(username)
  {
    $.ajax({
        type: "post",
        url: "http://frozenbits.tech/foodCashier/index.php/C_Pelanggan/actions/delete_pelanggan/"+username,
        beforeSend: function () {
        },
        success: function (status) {
            if(status)
            {
                alert('Data berhasil dihapus!');
                window.location.reload();
            }
        }
    });
  }

$("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#listmember .row").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});