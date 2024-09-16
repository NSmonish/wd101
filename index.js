const today = new Date();
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

document.getElementById("dob").max = maxDate.toISOString().slice(0, 10);
document.getElementById("dob").min = minDate.toISOString().slice(0, 10);

const dobInput = document.getElementById('dob');

dobInput.addEventListener('change', () => {
  const dob = new Date(dobInput.value);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();

  if (age < 18 || age > 55) {
    dobInput.setCustomValidity('Date of birth must be between 18 and 55 years old.');
    dobInput.reportValidity();
  } else {
    dobInput.setCustomValidity('');
  }
});

let userForm = document.getElementById("user-form");
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    }
    else {
        entries = [];
    }
    return entries;
}
let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
   const tableEntries = entries.map((entry) => {
    const nameCell = `<td class='border px-2 py-2'>${entry.name}</td>`;
    const emailCell = `<td class='border px-2 py-2'>${entry.email}</td>`;
    const passwordCell = `<td class='border px-2 py-2'>${entry.password}</td>`;
    const dobCell = `<td class='border px-2 py-2'>${entry.dob}</td>`;
    const acceptTermsCell = `<td class='border px-2 py-2'>${entry.acceptTerms}</td>`;

    const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`
    return row;
   }).join("\n");

   const table = `<table class="border w-full"><tr>
   <th class="px-4 py-2">Name</th>
   <th class="px-4 py-2">Email</th>
   <th class="px-4 py-2">Password</th>
   <th class="px-4 py-2">dob</th>
   <th class="px-4 py-2">accepted terms?</th>
   </tr>${tableEntries}</table>`

   let details = document.getElementById("user-entries");
   details.innerHTML = table;
}
const saveUseForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;

    const acceptTerms = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptTerms
    };

    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
}

userForm.addEventListener("submit", saveUseForm);
displayEntries();
