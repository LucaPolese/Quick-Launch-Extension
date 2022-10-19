window.addEventListener("DOMContentLoaded", () => {
    // initialize ul list with localstorage if not null
    if(localStorage["urls"] != null){
        document.getElementById("urls").innerHTML = localStorage["urls"];
    }


    // add delete button to each element
    var myNodes = document.getElementsByTagName("li");

    //get add button
    var addButton = document.getElementById("addBtn");

    //get launcher button
    var launcherButton = document.getElementById("launcherBtn");

    //add delete button to each element
    for(var i = 0; i < myNodes.length; i++){
        var span = document.createElement("span");
        var txt = document.createTextNode("\u00D7");
        span.className = "delete";
        span.appendChild(txt);
        myNodes[i].appendChild(span);
    }

    // click on delete button lo delete the current list item
    var deleteBtns = document.getElementsByClassName("delete");
    for(var i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].onclick = function(){
            if (confirm("Are you sure you want to delete this item?")) {
                var delElem = this.parentElement;
                delElem.remove();
                localStorage["urls"] = document.getElementById("urls").innerHTML;
            }
            else {
                return false;
            }
        }
    }

    // function that validate a url
    function isUrl(s) {
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return regexp.test(s);
    }

    // function to add new list item when AddButton is clicked as event listener
    addButton.addEventListener("click", () => {
        var li = document.createElement("li");
        var inputValue = document.getElementById("myInput").value;
        var t = document.createTextNode(inputValue);

        var a = document.createElement("a");
        a.setAttribute("href", inputValue);
        a.setAttribute("target", "_blank");
        a.appendChild(t);

        li.appendChild(a);
        if(inputValue === ''){
            alert("You must write something!");
        }
        else{
            if(isUrl(inputValue)){
                document.getElementById("urls").appendChild(li);
            }
            else{
                alert("You must write a valid URL!");
            }
        }
        document.getElementById("myInput").value = "";
        //update localstorage
        localStorage["urls"] = document.getElementById("urls").innerHTML;

        var span = document.createElement("span");
        var txt = document.createTextNode("\u00D7");
        span.className = "delete";
        span.appendChild(txt);
        li.appendChild(span);

        for(var i = 0; i < deleteBtns.length; i++){
            deleteBtns[i].onclick = function(){
                if (confirm("Are you sure you want to delete this item?")) {
                    var delElem = this.parentElement;
                    delElem.remove();
                    localStorage["urls"] = document.getElementById("urls").innerHTML;
                }
                else {
                    return false;
                }
            }
        }
    });

    // function to launch all the urls in the list when launcherButton is clicked as event listener
    launcherButton.addEventListener("click", () => {
        var myNodes = document.getElementsByTagName("a");
        for(var i = 0; i < myNodes.length; i++){
            chrome.tabs.create({url: myNodes[i].href});
        }
    });

}) // end of window.addEventListener