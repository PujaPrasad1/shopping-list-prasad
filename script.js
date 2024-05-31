document.addEventListener('DOMContentLoaded', loadItems); 
const itemForm = document.getElementById('item-form'); 
const itemInput = document.getElementById('item-input'); 
const itemList = document.getElementById('item-list'); 
const filter = document.getElementById('filter'); 
const clearBtn = document.getElementById('clear-btn'); 
const addBtn = document.getElementById('add-btn'); 
const updateBtn = document.getElementById('update-btn'); 
let isEditMode = false;
 let editItemId = null;
  itemForm.addEventListener('submit', addItem);
   itemList.addEventListener('click', removeOrEditItem);
    clearBtn.addEventListener('click', clearItems);
     filter.addEventListener('keyup', filterItems);
      function addItem(e) { 
        e.preventDefault();
         const newItem = itemInput.value.trim(); 
         if(newItem === '') return;
         if(isEditMode) {
             updateItem(newItem);
             } else {
                const li = document.createElement('li');
                 li.appendChild(document.createTextNode(newItem)); 
                 const deleteBtn = document.createElement('button'); 
                 deleteBtn.appendChild(document.createTextNode('X')); 
                 li.appendChild(deleteBtn); 
                 itemList.appendChild(li); 
                 saveItem(newItem);
                 } 
                 itemInput.value = ''; 
                } 
                function removeOrEditItem(e) { 
                    if(e.target.tagName === 'BUTTON') { 
                        const item = e.target.parentElement; 
                        const itemName = item.firstChild.textContent;
                         if(confirm('Are you sure?')) { 
                            item.remove(); 
                            removeItemFromStorage(itemName); 
                        } 
                    } else { 
                        enterEditMode(e.target); 
                    } 
                } 
                function clearItems() { 
                    itemList.innerHTML = ''; 
                    localStorage.removeItem('items');
                 }
                  function filterItems(e) { 
                    const text = e.target.value.toLowerCase(); 
                    document.querySelectorAll('li').forEach(item => {
                          const itemName = item.firstChild.textContent; 
                          if(itemName.toLowerCase().indexOf(text) !== -1) { 
                            item.style.display = 'flex';
                         } else { 
                            item.style.display = 'none'; 
                        } 
                    });
                 } function saveItem(item) { 
                    let items = getItemsFromStorage(); 
                    items.push(item); localStorage.setItem('items', JSON.stringify(items));
                 }
                  function getItemsFromStorage() { 
                    let items; 
                    if(localStorage.getItem('items') === null) { 
                        items = []; 
                    } else { 
                        items = JSON.parse(localStorage.getItem('items'));
                     } 
                     
                     return items;
                     } function loadItems() { 
                        let items = getItemsFromStorage(); 
                        items.forEach(item => { 
                            const li = document.createElement('li'); 
                            li.appendChild(document.createTextNode(item)); 
                            const deleteBtn = document.createElement('button');
                             deleteBtn.appendChild(document.createTextNode('X'));
                              li.appendChild(deleteBtn); 
                              itemList.appendChild(li);
                            }); 
                        } 
                        function removeItemFromStorage(item) { 
                            let items = getItemsFromStorage(); 
                            items = items.filter(i => i !== item);
                             localStorage.setItem('items', JSON.stringify(items)); 
                            } 
                            function enterEditMode(item) { 
                                isEditMode = true;
                                 editItemId = item.firstChild.textContent; 
                                 itemInput.value = editItemId;
                                  addBtn.style.display = 'none'; 
                                  updateBtn.style.display = 'inline';
                                 } 
                                 function updateItem(newItem) {
                                     document.querySelectorAll('li').forEach(item => { 
                                        if(item.firstChild.textContent === editItemId) { 
                                            item.firstChild.textContent = newItem; 
                                            removeItemFromStorage(editItemId); 
                                            saveItem(newItem); 
                                        } 
                                    }); 
                                    isEditMode = false;
                                     editItemId = null; 
                                     addBtn.style.display = 'inline';
                                      updateBtn.style.display = 'none'; 
                                    }