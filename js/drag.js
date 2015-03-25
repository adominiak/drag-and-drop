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
        var div = document.createElement("DIV");
        div.classList.add('dragable');
        div.draggable = true;
        attachEvents(div);
        div.innerHTML = e.dataTransfer.getData('text/html');
        if (this.compareDocumentPosition(dragSrcEl) === 4){
          this.parentElement.insertBefore(div,this);
        }
        else {
          if (this === this.parentElement.lastChildElement) {
            console.log('last');
            this.parentElement.appendChild(div);
          }
          else {
            this.parentElement.insertBefore(div, this.nextElementSibling);
          }
        }
        this.parentElement.removeChild(dragSrcEl);
      }
      this.classList.remove('over');
      return false;
    }

    function attachEvents(element){
      element.addEventListener('dragstart', handleDragStart, false);;
      element.addEventListener('dragenter', handleDragEnter, false);
      element.addEventListener('dragover', handleDragOver, false);
      element.addEventListener('dragleave', handleDragLeave, false);
      element.addEventListener('dragend', handleDragEnd, false);
      element.addEventListener('drop', handleDrop, false);
    }

    var cols = document.querySelectorAll('.dragable');
    [].forEach.call(cols, function(col) {
      attachEvents(col);
    });
  }
  window.onload = function(){
    new Main();
  };
}());
