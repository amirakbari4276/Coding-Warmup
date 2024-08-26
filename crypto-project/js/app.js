const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
const itemsPerPage = 10;
let currentPage = 1;
let totalPages = 1;
let cryptoData = [];


// fetch data from api

async function fetchCryptoData() {
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        cryptoData = data;
        totalPages = Math.ceil(cryptoData.length / itemsPerPage);
        displayCryptoData();
        setupPagination();
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}



// put data in html tags

function displayCryptoData() {
    const container = document.getElementById('crypto-container');
    container.innerHTML = '';

    let start = (currentPage - 1) * itemsPerPage;
    let end ;

    // handling fianal page
    if ( currentPage ===  totalPages) {
        end = cryptoData.length;
    }else {
        end = start + itemsPerPage;
    }
    const paginatedData = cryptoData.slice(start, end);

    paginatedData.forEach(coin => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = coin.image;
        img.alt = coin.name;

        const title = document.createElement('h2');
        title.textContent = `${coin.name} (${coin.symbol.toUpperCase()})`;

        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = `$${coin.current_price.toLocaleString()}`;

        const change = document.createElement('p');
        change.className = 'change';
        change.textContent = `${coin.price_change_percentage_24h.toFixed(2)}%`;
        change.classList.add(coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative');

        const marketCap = document.createElement('p');
        marketCap.textContent = `Market Cap: $${(coin.market_cap / 1e9).toFixed(2)}B`;

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(change);
        card.appendChild(marketCap);

        container.appendChild(card);
    });
}


// set pagination button

function setupPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currentPage ? 'active' : '';
        button.disabled = i === currentPage;
        button.addEventListener('click', () => {
            currentPage = i;
            displayCryptoData();
            setupPagination();
        });
        pagination.appendChild(button);
    }
}


fetchCryptoData();
setInterval(fetchCryptoData, 50000);

