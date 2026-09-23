//5sec slider
const tabBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

let currentTabIndex = 0;
let tabInterval;

const hideTabContent = () => {
    tabBlocks.forEach((item) => {
        item.style.display = 'none';
        item.classList.remove('active');
    });
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active');
    });
};
const showTabContent = (index = 0) => {
    tabBlocks[index].style.display = 'flex';
    tabBlocks[index].classList.add('active');
    tabs[index].classList.add('tab_content_item_active');
    currentTabIndex = index;
};
const nextTab = () => {
    currentTabIndex = (currentTabIndex + 1) % tabs.length;
    hideTabContent();
    showTabContent(currentTabIndex);
};
const startTabSlider = () => {
    tabInterval = setInterval(nextTab, 5000);
};
hideTabContent();
showTabContent(0);
startTabSlider();

if (tabsParent) {
    tabsParent.onclick = (event) => {
        const target = event.target.closest('.tab_content_item');
        if (target) {
            tabs.forEach((item, index) => {
                if (target === item) {
                    clearInterval(tabInterval);
                    hideTabContent();
                    showTabContent(index);
                    startTabSlider();
                }
            });
        }
    };
}

//convert money
const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const convert = (element) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            if (!response.ok) return;

            const { usd, eur } = await response.json();

            if (element.value.trim() === '') {
                somInput.value = '';
                usdInput.value = '';
                eurInput.value = '';
                return;
            }
            const val = parseFloat(element.value);

            if (element.id === 'som') {
                usdInput.value = (val / usd).toFixed(2);
                eurInput.value = (val / eur).toFixed(2);
            } else if (element.id === 'usd') {
                somInput.value = (val * usd).toFixed(2);
                eurInput.value = ((val * usd) / eur).toFixed(2);
            } else if (element.id === 'eur') {
                somInput.value = (val * eur).toFixed(2);
                usdInput.value = ((val * eur) / usd).toFixed(2);
            }
        } catch (error) {
            console.error(error);
        }
    };
};
if (somInput) convert(somInput);
if (usdInput) convert(usdInput);
if (eurInput) convert(eurInput);

//cards200
const TODO_API = 'https://jsonplaceholder.typicode.com/todos/';
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
const card = document.querySelector('.card');

let count = 1;
const MAX_CARDS = 200;

const fetchCard = async (id) => {
    try {
        const response = await fetch(`${TODO_API}${id}`);
        const { id: idCard, title, completed } = await response.json();
        const color = completed ? 'green' : 'red';

        if (card) {
            card.style.borderColor = color;
            card.innerHTML = `
                <p>ID: ${idCard}</p>
                <p>${title}</p>
                <p style="color: ${color}">${completed ? 'Completed' : 'Not completed'}</p>
            `;
        }
    } catch (e) {
        console.error(e);
    }
};
const changeCard = (step) => {
    count += step;
    if (count > MAX_CARDS) count = 1;
    if (count < 1) count = MAX_CARDS;
    fetchCard(count);
};
fetchCard(count);

if (btnNext) btnNext.onclick = () => changeCard(1);
if (btnPrev) btnPrev.onclick = () => changeCard(-1);