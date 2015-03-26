(function() {
  var Main = function() {

    function handleDragStart(e) {
      addClass(this, "is-dragged");  //jquery? classList doesn"t work in ie9
      e.dataTransfer.effectAllowed = "copy";
      e.dataTransfer.setData("text", e.target.id);
    }

    function handleDragEnd(e) {
      removeClass(this, "is-dragged"); // this.classList.remove("is-dragged"); - does not work in ie9
    }

    function handleDragEnter(e) {
      addClass(this, "over");
      return false;
    }
    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = "copy";
      return false;
    }
    function handleDragLeave(e) {
      removeClass(this, "over");
    }
    function handleDrop(e) {
      if(e.preventDefault) {
        e.preventDefault();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      var dragSrcEl = document.getElementById(e.dataTransfer.getData("text"));
      if (dragSrcEl != null && dragSrcEl != this) {
        if (this.compareDocumentPosition(dragSrcEl) === 4){
          this.parentElement.insertBefore(dragSrcEl,this);
        }
        else {
          if (this === this.parentElement.lastChildElement) {
            this.parentElement.appendChild(dragSrcEl);
          }
          else {
            this.parentElement.insertBefore(dragSrcEl, this.nextElementSibling);
          }
        }
      }
      removeClass(this, "over");
      return false;
    }

    function removeClass(element, classToRemove) {
      var classList = element.getAttribute("class").split(" ");
      var finalClasses = [];
      var i = classList.length;
      while (i--) {
        if (classList[i] !== classToRemove) {
          finalClasses.push(classList[i]);
        }
      }
      element.setAttribute("class", finalClasses.join(" "));
    }

    function addClass(element, classToAdd) {
      var classList = element.getAttribute("class").split(" ");
      var i = classList.length;
      while (i--) {
         if (classList[i] == classToAdd) {
             return;
         }
      }
      element.setAttribute("class", classList.join(" ")+" "+classToAdd);
    }

    function attachEvents(element) {
      element.addEventListener("dragstart", handleDragStart, false);;
      element.addEventListener("dragenter", handleDragEnter, false);
      element.addEventListener("dragover", handleDragOver, false);
      element.addEventListener("dragleave", handleDragLeave, false);
      element.addEventListener("dragend", handleDragEnd, false);
      element.addEventListener("drop", handleDrop, false);
    }

    var cols = document.querySelectorAll(".dragable");
    [].forEach.call(cols, function(col) {
      attachEvents(col);
    });
  }
  window.onload = function() {
    new Main();
  };
}());
