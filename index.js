let urlLinks = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const saveBtn = document.querySelector("button#tab-btn");
const deleteBtn = document.querySelector("#delete-btn");
let linksFromLocalStorage = JSON.parse(localStorage.getItem("urlLinks"));
const ulEl = document.querySelector("#ul-el");

if (linksFromLocalStorage) {
  urlLinks = linksFromLocalStorage;
  render(urlLinks);
}

function render(links) {
  let listItems = "";
  for (let i = 0; i < links.length; i++) {
    listItems += `<li><a target="_blank" href="${links[i]}">${links[i]}</a></li>`;
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  urlLinks.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("urlLinks", JSON.stringify(urlLinks));
  render(urlLinks);
});

saveBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    urlLinks.push(tabs[0].url);
    localStorage.setItem("urlLinks", JSON.stringify(urlLinks));
    render(urlLinks);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  urlLinks = [];
  render(urlLinks);
});
