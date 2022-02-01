<!-- Loader modal -->
<div id="loader_modal" class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="loading"></div>
    </div>
  </div>
</div>

<!-- Details modal -->
<div id="comic_modal" class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <!-- Title of modal -->
      <div class="modal-header">
        <h3 id="comic_title" class="modal-title"></h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Body of modal -->
      <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-md-6 order-md-6">
                <img id="comic_image" alt=""/>
              </div>
              <div class="col-md-6 order-md-1">
                <div class="row h-100">
                  <div class="col">
                    <h4 id="comics_characters_title"></h4>
                    <div class="container-fluid">
                      <div id="comics_characters" class="row">                         
                      </div>
                    </div>
                    <hr>      
                    <h4 id="comics_creators_title"></h4>
                    <div class="container-fluid">
                      <div id="comics_creators" class="row"> 
                      </div>
                    </div> 
                    <hr>
                    <div id="comic_price" class="col-md-12 comic_price">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>