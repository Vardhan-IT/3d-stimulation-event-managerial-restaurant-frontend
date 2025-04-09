$(document).ready(function () {
    let total = 0;
  
    // Load categories
    $.get('get_categories.php', function (data) {
      $('#categoryList').html(data);
    });
  
    // Load all items by default
    loadItems();
  
    function loadItems(category = '') {
      $.post('get_items.php', { category: category }, function (data) {
        $('#itemsList').html(data);
      });
    }
  
    // Click on category
    $(document).on('click', '.category-item', function () {
      const selectedCategory = $(this).text();
      loadItems(selectedCategory);
    });
  
    // Click on item to add to bill
    $(document).on('click', '.item-card', function () {
      const name = $(this).data('name');
      const price = parseFloat($(this).data('price'));
  
      $('#billList').append(`<li>${name} - ₹${price.toFixed(2)}</li>`);
      total += price;
      $('#totalAmount').text(`Total: ₹${total.toFixed(2)}`);
    });
  });
  $('#checkoutBtn').on('click', function () {
    if ($('#billList li').length === 0) {
      alert('No items in the bill!');
      return;
    }
  
    let receiptText = "🧾 Receipt\n-------------------\n";
    $('#billList li').each(function () {
      receiptText += $(this).text() + '\n';
    });
    receiptText += "-------------------\n";
    receiptText += $('#totalAmount').text() + '\n';
    receiptText += "Thank you for shopping! 🛍️";
  
    $('#receipt').text(receiptText).show();
  
    // Optional: Print popup
    const printWindow = window.open('', '', 'width=400,height=600');
    printWindow.document.write('<pre>' + receiptText + '</pre>');
    printWindow.document.close();
    printWindow.print();
  });
  