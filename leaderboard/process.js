const list = document.querySelector('#list')
const sbar = document.querySelector('#search-bar-input')
// async fetch
fetch('https://api.node2.xsense.id/rafi/pochu/v1/leaderboard').then(resp => {
    return resp.json();
}).then(data => {
    document.querySelector('.c-item-loading').classList.toggle('d-none')
    data.values.forEach((dat, i) => {
        i = i+1
        let newRow = document.createElement('li');
        newRow.classList = 'c-list__item';
        newRow.innerHTML = `
                <div class="c-list__grid">
                    <div class="c-flag c-place u-bg--transparent">${i}</div>
                    <div class="c-media">
                        <img class="c-avatar c-media__img" src="assets/default.jpg" />
                        <div class="c-media__content">
                            <div class="c-media__title ${
                                i <= 3 ? 'u-text--bold' : ''
                            }">${dat.name}</div>
                        </div>
                    </div>
                    <div class="u-text--center c-castaff c-number ${
                        i === 1 ? 'u-text--yellow' : i === 2 ? 'u-text--teal' : i === 3 ? 'u-text--orange' : ''
                    }">
                        <div class="u-mt--8">
                            <strong>${dat.ca}</strong>
                        </div>
                    </div>
                    <div class="u-text--center c-staff c-number ${
                        i === 1 ? 'u-text--yellow' : i === 2 ? 'u-text--teal' : i === 3 ? 'u-text--orange' : ''
                    }">
                        <div class="u-mt--8">
                            <strong>${dat.staff}</strong>
                        </div>
                    </div>
                    <div class="u-text--center c-total c-number ${
                        i === 1 ? 'u-text--yellow' : i === 2 ? 'u-text--teal' : i === 3 ? 'u-text--orange' : ''
                    }">
                        <div class="u-mt--8">
                            <strong>${dat.total}</strong>
                        </div>
                    </div>
                </div>
            `;
        if (i === 1) {
            newRow.querySelector('.c-place').classList.add('u-text--dark');
            newRow.querySelector('.c-place').classList.add('u-bg--yellow');
        } else if (i === 2) {
            newRow.querySelector('.c-place').classList.add('u-text--dark');
            newRow.querySelector('.c-place').classList.add('u-bg--teal');
        } else if (i=== 3) {
            newRow.querySelector('.c-place').classList.add('u-text--dark');
            newRow.querySelector('.c-place').classList.add('u-bg--orange');
        }
        list.appendChild(newRow);
    })
});

sbar.addEventListener('keyup', (e) => {
    let search = e.target.value.toLowerCase().trim();
    let list = document.querySelectorAll('.c-list__item');
    Array.from(list).slice(2).forEach((item) => {
        let name = item.querySelector('.c-media__title').textContent.toLowerCase().trim();
        if (name.indexOf(search) !== -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
})