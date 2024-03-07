const loadPhone = async (searchInputText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(pnones);
  displayPhones(phones, isShowAll);

}
const displayPhones = (phones, isShowAll) => {
  // console.log(phones)
  const phoneContainer = document.getElementById('phone-container')



  // clear phone container 
  phoneContainer.textContent = "";
  const showAllItem = document.getElementById('show-all-item');
  showAllItem.classList.add('text-start')

  if (phones.length > 12 && !isShowAll) {
    showAllItem.classList.remove('hidden')

  }
  else {
    showAllItem.classList.add('hidden')
  }
  console.log('is show all', isShowAll)
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  // phones =phones.slice(0,12)
  phones.forEach(phone => {
    console.log(phone)
    // 2 create a div 
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card card-compact  bg-white p-4  shadow-xl`;


    // 3 set innerHtml
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.price}</p>
          <div class="card-actions justify-center">
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;

    // 4 append child 
    phoneContainer.appendChild(phoneCard)
  });

  loadingSpinner(false);

}

const showDetails = async (id) => {
  // console.log('show all details',id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  console.log(data)
  // showPhoneDetails(data)
  const phone = data.data;
  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
  console.log(phone)
  show_details_modal.showModal();

  const showDetailsModal = document.getElementById('show-details-modal');

  showDetailsModal.innerHTML = `
  <img class="items-center mx-36" src="${phone.image}" alt="">
  <h3 class="font-bold text-3xl text-red-500">${phone.name}</h3>
  
  <p class="py-0"><span class="text-xl ">Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p class="py-0"><span class="text-xl ">GPS:</span>${phone?.others?.GPS || 'No GPS'}</p>
  
  <div class="modal-action flex justify-center">
    <form method="dialog">
      
      <button class="btn btn-error text-white">Close</button>
  </form>
</div>
  
  `;


}






// Search Engine 
const search = (isShowAll) => {
  loadingSpinner(true);
  const searchField = document.getElementById('searchInput');
  const searchInputText = searchField.value;
  console.log(searchInputText)
  loadPhone(searchInputText ,isShowAll);
}

// Search Engine recap
// const search2 = () => {
//   loadingSpinner(true);
//   const searchField2 = document.getElementById('searchInput2');
//   const searchInputText = searchField2.value;
//   console.log(searchInputText);
//   loadPhone(searchInputText);
// }

// LoadingSpinner
const loadingSpinner = (isloading) => {
  const loading = document.getElementById('loading-spinner');
  if (isloading) {
    loading.classList.remove('hidden')
  }
  else {
    loading.classList.add('hidden')
  }
}
const ShowAll = () => {
  search(true)
}

// loadPhone();


