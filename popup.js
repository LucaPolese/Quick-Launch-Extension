window.addEventListener("DOMContentLoaded", () => {
    // initialize ul list with localstorage if not null
    if(localStorage["urls"] != null){
        document.getElementById("urls").innerHTML = localStorage["urls"];
    }


    // get li elements
    var myNodes = document.getElementsByTagName("li");

    //get add button
    var addButton = document.getElementById("addBtn");

    //get launcher button
    var launcherButton = document.getElementById("launcherBtn");

    //add delete and hide button to each element
    for(var i = 0; i < myNodes.length; i++){

        //if it has the div already, skip it
        if(myNodes[i].getElementsByTagName("div").length > 0){
            continue;
        }

        var div = document.createElement("div");
        div.className = "btn-group";

        var hideBtn = document.createElement("button");
        var hideTxt = document.createTextNode("hide");
        hideBtn.className = "hide";
        hideBtn.appendChild(hideTxt);
        div.appendChild(hideBtn);
        
        var delBtn = document.createElement("button");
        var delTxt = document.createTextNode("\u00D7");
        delBtn.className = "delete";
        delBtn.appendChild(delTxt);
        div.appendChild(delBtn);

        myNodes[i].appendChild(div);
    }

    // click on delete button lo delete the current list item
    var deleteBtns = document.getElementsByClassName("delete");
    for(var i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].onclick = function(){
            if (confirm("Are you sure you want to delete this item?")) {
                var delElem = this.parentElement;
                delElem.parentElement.remove();
                localStorage["urls"] = document.getElementById("urls").innerHTML;
            }
            else {
                return false;
            }
        }
    }

    //click on hide button to give a text-decoration: line-through; to the current list item and bolder color
    var hideBtns = document.getElementsByClassName("hide");
    for(var i = 0; i < hideBtns.length; i++){
        hideBtns[i].onclick = function(){
            var hideElem = this.parentElement;
            // if it has hidden-url; class also
            if(hideElem.parentElement.classList.contains("hidden-url")){
                hideElem.parentElement.classList.remove("hidden-url");
                this.innerHTML = "hide";
            }
            else{
                hideElem.parentElement.classList.add("hidden-url");
                this.innerHTML = "show";
            }

            localStorage["urls"] = document.getElementById("urls").innerHTML;
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
        li.className = "inline-li";
        var inputValue = document.getElementById("myInput").value;
        var inputValue2 = document.getElementById("myInput2").value;
        var t = document.createTextNode(inputValue);
        var t2 = document.createTextNode(inputValue2);

        var a = document.createElement("a");
        a.setAttribute("href", inputValue);
        a.setAttribute("target", "_blank");
        a.appendChild(t2);

        li.appendChild(a);
        if(inputValue === ''){
            alert("You must write an URL");
            //focus on input element
            document.getElementById("myInput").focus();
        }
        if(inputValue2 === ''){
            alert("You must write a name");
            //focus on input element
            document.getElementById("myInput2").focus();
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
        document.getElementById("myInput2").value = "";
        //update localstorage
        localStorage["urls"] = document.getElementById("urls").innerHTML;

        var div = document.createElement("div");
        div.className = "btn-group";

        var hideBtn = document.createElement("button");
        var hideTxt = document.createTextNode("hide");
        hideBtn.className = "hide";
        hideBtn.appendChild(hideTxt);
        div.appendChild(hideBtn);
        
        var delBtn = document.createElement("button");
        var delTxt = document.createTextNode("\u00D7");
        delBtn.className = "delete";
        delBtn.appendChild(delTxt);
        div.appendChild(delBtn);

        li.appendChild(div);

        for(var i = 0; i < deleteBtns.length; i++){
            deleteBtns[i].onclick = function(){
                if (confirm("Are you sure you want to delete this item?")) {
                    var delElem = this.parentElement;
                    delElem.parentElement.remove();
                    localStorage["urls"] = document.getElementById("urls").innerHTML;
                }
                else {
                    return false;
                }
            }
        }

        for(var i = 0; i < hideBtns.length; i++){
            hideBtns[i].onclick = function(){
                var hideElem = this.parentElement;
                if(hideElem.parentElement.classList.contains("hidden-url")){
                    hideElem.parentElement.classList.remove("hidden-url");
                    this.innerHTML = "hide";
                }
                else{
                    hideElem.parentElement.classList.add("hidden-url");
                    // change text inside the current button
                    this.innerHTML = "show";
                }
                    localStorage["urls"] = document.getElementById("urls").innerHTML;
            }
        }
    });

    // function to launch all the urls in the list when launcherButton is clicked as event listener
    launcherButton.addEventListener("click", () => {
        // take the a tag only if the li element has not the class hidden-url
        var activeLinks = document.querySelectorAll("li:not(.hidden-url) a");
        for(var i = 0; i < activeLinks.length; i++){
            chrome.tabs.create({url: activeLinks[i].href});
        }
    });

}) // end of window.addEventListener