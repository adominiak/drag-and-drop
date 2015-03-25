(function(){
  var Main = function(){
    var dragSrcEl = null;

    function handleDragStart(e) {
      this.classList.add("is-dragged");
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnd(e) {
      this.classList.remove("is-dragged");
    }

    function handleDragEnter(e) {
      this.classList.add('over');
    }
    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      return false;
    }

    function handleDragLeave(e) {
      this.classList.remove('over');
    }

    function handleDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }
      return false;
    }

    var cols = document.querySelectorAll('.dragable');
    [].forEach.call(cols, function(col) {
      col.addEventListener('dragstart', handleDragStart, false);;
      col.addEventListener('dragenter', handleDragEnter, false);
      col.addEventListener('dragover', handleDragOver, false);
      col.addEventListener('dragleave', handleDragLeave, false);
      col.addEventListener('dragend', handleDragEnd, false);
      col.addEventListener('drop', handleDrop, false);
    });
  }
  window.onload = function(){
    new Main();
  };
}());
