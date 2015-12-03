/**
 * Created by roody on 06.11.15.
 */
(function(){
    var dbTest = new PouchDB('test');
    var remoteCouchTest = 'https://035e0137-413b-4d3a-8273-9b6945dc3206-bluemix:f21458e3f0f6d1c33e30ccc93ec40c5658bf042effe24f818f38d8847f964efa@035e0137-413b-4d3a-8273-9b6945dc3206-bluemix.cloudant.com/sample_nosql_db';


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
