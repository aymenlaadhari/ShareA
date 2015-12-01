/**
 * Created by roody on 06.11.15.
 */
(function(){
    var dbTest = new PouchDB('test');
    var remoteCouchTest = 'https://0c63a633-7702-49d4-a122-c063734cc194-bluemix:326819ff6efadaa99bb0cc4ec1e458a73850decb9e4946c0dfa2eb1ea26b92ba@0c63a633-7702-49d4-a122-c063734cc194-bluemix.cloudant.com/data_test';


    db.changes({
        since: 'now',
        live: true
    }).on('change',showTest);

    // Initialise a sync with the remote server
  function sync() {
    syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = {live: true};
    db.replicate.to(remoteCouchTest, opts, syncError);
    db.replicate.from(remoteCouchTest, opts, syncError);
  }

  //Synchronize when remote URL exist.
  if (remoteCouch) {
    sync();
  }

}());
