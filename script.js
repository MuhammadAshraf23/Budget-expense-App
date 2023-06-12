function showData() {
    document.getElementById("balance-amount").innerHTML = localStorage.getItem("Total-Amount");
    document.getElementById("amount").innerHTML = localStorage.getItem("Total-Amount");
    var data = JSON.parse(localStorage.getItem("expenses")) || [];
    var list = document.getElementById("list");
    list.innerHTML = ""; // Clear the list before re-rendering
    data.forEach((item) => {
      list.innerHTML += `
        <div class="sublist-content">
          <p class="product">${item.productTitle}</p>
          <p class="amount">${item.userAmount}</p>
        </div>
      `;
    });
  }

  showData();

  function setBudget() {
    var total_amount_length = document.getElementById("total-amount").value.length;
    if (total_amount_length === 0) {
      document.getElementById("budget-error").classList.remove("hide");
    } else {
      document.getElementById("budget-error").classList.add("hide");
      var total_amount = parseInt(document.getElementById("total-amount").value);
      localStorage.setItem("Total-Amount", total_amount);
      document.getElementById("balance-amount").innerHTML = total_amount;
      document.getElementById("amount").innerHTML = total_amount;
    }
  }

  function setExpense() {
    var product_title = document.getElementById("product-title").value;
    var user_amount = parseInt(document.getElementById("user-amount").value);
    var total_amount = parseInt(localStorage.getItem("Total-Amount"));

    if (user_amount > total_amount) {
      alert("Total Amount is short");
    } else {
      var product_title_error = document.getElementById("product-title-error");
      if (product_title.length === 0 || isNaN(user_amount)) {
        product_title_error.classList.remove("hide");
      } else {
        product_title_error.classList.add("hide");
        var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        var obj = {
          productTitle: product_title,
          userAmount: user_amount,
        };
        expenses.push(obj);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        showData(); // Update the displayed data
      }
    }
  }