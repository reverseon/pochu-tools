const list = document.querySelector('#list')
const sbar = document.querySelector('#search-bar-input')
const msg_cnt = document.querySelector('#msg-cnt')
let errflag = false;
// async fetch
fetch('https://chloe.maid.naj.one/pochu/genfinder').then(resp => {
    if (!resp.ok) throw new Error(resp.status);
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
}).catch(err => {
    errflag = true;
    if (err.message === '429') {
        msg_cnt.innerHTML = `Terlalu banyak request, silakan refresh dalam satu menit.`;
    } else {
        msg_cnt.innerHTML = `Terjadi kesalahan, silakan refresh halaman dalam beberapa saat.`;
    }
})

sbar.addEventListener('keyup', (e) => {
    setTimeout(() => {
        if (errflag) return;
        let search = e.target.value.toLowerCase().trim();
        let list = document.querySelectorAll('.c-list__item');
        if (search.length > 0) {
            msg_cnt.innerHTML = `Tidak ada hasil...`;
        } else {
            msg_cnt.innerHTML = `Silakan masukkan kata pencarian...`
        }
        document.querySelector('.c-item-no-result').classList.toggle('d-none', false);
        let foundfirst = false;
        let matchName = false;
        let matchNIM = false;
        let matchJurusan = false;
        let matchFakultas = false;
        let matchGenerasi = false;
        let isqString = false;
        let isqGenerasi = false;
        let isqAll = false;
        let generasiregex = /\bg\d{1,2}\b/;
        if (search.length > 0) {
            if (generasiregex.test(search)) {
                isqGenerasi = true;
            } else if (search === 'all') {
                isqAll = true;
            } else {
                isqString = true;
            }
        }
        Array.from(list).slice(2).forEach((item) => {
            if (!isqAll && (isqString || isqGenerasi)) {
                if (isqGenerasi) {
                    let generasi = item.querySelector('.c-generasi').textContent.toLowerCase().trim();
                    matchGenerasi = generasi.includes(search);
                } else {
                    let nama = item.querySelector('.c-media__title').textContent.toLowerCase().trim();
                    let jurusan = item.querySelector('.c-jurusan').textContent.toLowerCase().trim();
                    let fakultas = item.querySelector('.c-fakultas').textContent.toLowerCase().trim();
                    let NIM = item.querySelector('.c-media__NIM').textContent.toLowerCase().trim();
                    matchNIM = NIM.includes(search);
                    matchName = nama.includes(search);
                    matchJurusan = jurusan.includes(search);
                    matchFakultas = fakultas.includes(search);
                }
            }
            if (isqAll || matchName || matchNIM || matchJurusan || matchFakultas || matchGenerasi) {
                if (!foundfirst) {
                    foundfirst = true;
                    document.querySelector('.c-item-no-result').classList.toggle('d-none', true);
                }
                item.classList.toggle('d-none', false);
            } else {
                item.classList.toggle('d-none', true);
            }
            })
    }, 500)
})