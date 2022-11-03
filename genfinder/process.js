const list = document.querySelector('#list')
const sbar = document.querySelector('#search-bar-input')
// async fetch
fetch('https://chloe.xsense.id/api/pochu/v1/personal').then(resp => {
    return resp.json();
}).then(data => {
    data.values.forEach((dat, i) => {
        i = i+1
        let newRow = document.createElement('li');
        newRow.classList = 'c-list__item d-none';
        newRow.innerHTML = `
                <div class="c-list__grid">
                    <div class="c-media">
                        <div class="c-media__content">
                            <div class="c-media__title u-text--bold">${dat.nama_lengkap}</div>
                            <div class="c-media__NIM color-primary u-text--bold">${dat.NIM}</div>
                            <div class="c-media__fakjur u-text--teal">
                                <span class="span-first c-jurusan">${dat.jurusan}</span>
                                <span class="c-fakultas">${dat.fakultas}</span>
                            </div>
                        </div>
                    </div>
                    <div class="u-text--right c-generasi">
                        <div class="u-mt--8 u-text--yellow">
                            <strong>${dat.angkatan_genshi}</strong>
                        </div>
                    </div>
                </div>
            `;
        list.appendChild(newRow);
    })
});

sbar.addEventListener('keyup', (e) => {
    let search = e.target.value.toLowerCase().trim();
    let list = document.querySelectorAll('.c-list__item');
    document.querySelector('.c-item-no-result').classList.toggle('d-none', false);
    let foundfirst = false;
    Array.from(list).slice(2).forEach((item) => {
        let name = item.querySelector('.c-media__title').textContent.toLowerCase().trim();
        let NIM = item.querySelector('.c-media__NIM').textContent.toLowerCase().trim();
        let jurusan = item.querySelector('.c-jurusan').textContent.toLowerCase().trim();
        let fakultas = item.querySelector('.c-fakultas').textContent.toLowerCase().trim();
        let generasi = item.querySelector('.c-generasi').textContent.toLowerCase().trim();
        let all = 'all'
        if (search.length > 0 && (name.indexOf(search) !== -1 || NIM.indexOf(search) !== -1 || jurusan.indexOf(search) !== -1 || fakultas.indexOf(search) !== -1 || generasi.indexOf(search) !== -1 || all === search)) {
            if (!foundfirst) {
                foundfirst = true;
                document.querySelector('.c-item-no-result').classList.toggle('d-none', true);
            }
            item.classList.toggle('d-none', false);
        } else {
            item.classList.toggle('d-none', true);
        }
    })
})