// Saves options to chrome.storage.sync.
function save_options() {
  var sci = document.getElementById('sci_hub').value;
  chrome.storage.local.set({
    sci_hub: sci,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({
    sci_hub: 'sci-hub.cc',
  }, function(items) {
    document.getElementById('sci_hub').value = items.sci_hub;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);