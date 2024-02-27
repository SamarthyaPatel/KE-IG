handleHeight = () => {
    var textareas = document.querySelectorAll("tr.single-row .product-name");
    textareas.forEach((text) => {
        text.style.height = text.scrollHeight - 17.5 + 'px';
    })
}

const tBody = document.getElementById("table-body");

addNewRow = () => {
    const row = document.createElement("tr");
    row.className = "single-row";
    row.innerHTML = `<td><textarea placeholder="Title" class="product-name" wrap="soft" style="height: 15px;" oninput="handleHeight()"></textarea></td>
                    <td><input type="number" placeholder="0" name="unit" class="unit product-number" id="unit" onkeyup="getInput()"></td>
                    <td><input type="number" placeholder="0" name="price" class="price product-number" id="price" onkeyup="getInput()"></td>
                    <td><input type="number" placeholder="0" name="amount" class="amount product-number" id="amount" disabled></td>
                    <td style="text-align: right; cursor: pointer;" class="button"><span action="delete">🗑</span></td>`

    tBody.insertBefore(row, tBody.lastElementChild.previousSibling);
}

document.getElementById("add-row").addEventListener("click", (e)=> {
    e.preventDefault();
    addNewRow();
});

//GET INPUTS, MULTIPLY AND GET THE ITEM PRICE
getInput =()=> {
    var rows = document.querySelectorAll("tr.single-row");
    rows.forEach((currentRow) => {
        var unit = currentRow.querySelector("#unit").value;
        var price = currentRow.querySelector("#price").value;

        amount = unit * price;
        currentRow.querySelector("#amount").value = amount;
        overallSum();

    })
};

//Get the overall sum/Total
overallSum =()=> {
    var arr = document.getElementsByName("amount");
    var total = 0;
    var advance = 0;
    var net = 0;
    for(var i = 0; i < arr.length; i++) {
        if(arr[i].value) {
            total += +arr[i].value;
        }
        document.getElementById("total").value = total.toLocaleString('en-IN');
        advance = document.getElementById("advance").value;
        net = total - advance;
        document.getElementById("net-total").value = net.toLocaleString('en-IN');
    }
}

//Delete row from the table
tBody.addEventListener("click", (e)=>{
    let el = e.target;
    const deleteROW = e.target.getAttribute("action");
    if(deleteROW == "delete") {
        delRow(el);
        overallSum();
    }
})

//Target row and remove from DOM;
delRow =(el)=> {
    el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
}

//Print button 

const print_button = document.getElementById("print-button");

print_button.addEventListener("click", () => {

    var buttons = document.getElementsByClassName("button");

    var upper_main = document.getElementById("upper-main");
    upper_main.classList.add("hide-logo");

    var upper_main = document.getElementById("attribute");
    upper_main.classList.add("hide");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("hide");
    };
});

// Show buttons
function handleShortcut(event) {
    if (event.key === "X") {
        event.preventDefault();
        var buttons = document.getElementsByClassName("button");

        var upper_main = document.getElementById("upper-main");
        upper_main.classList.remove("hide-logo");

        var upper_main = document.getElementById("attribute");
        upper_main.classList.remove("hide");

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("hide");
        };
    }
}

document.addEventListener("keypress", handleShortcut);
