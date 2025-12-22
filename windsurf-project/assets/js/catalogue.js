async function loadCatalogue(){
  const grid = document.getElementById('catalogueGrid');
  const empty = document.getElementById('catalogueEmpty');
  const q = document.getElementById('search');
  const type = document.getElementById('typeFilter');
  const collection = document.getElementById('collectionFilter');
  if(!grid) return;

  let products = [];
  try{
    const res = await fetch('assets/data/catalogue.json');
    products = await res.json();
  }catch(e){
    grid.innerHTML = '<div class="catalogue-empty">Erreur de chargement du catalogue.</div>';
    return;
  }

  function render(list){
    grid.innerHTML = '';
    if(!list.length){ empty.classList.remove('hidden'); return; }
    empty.classList.add('hidden');
    for(const p of list){
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.nom}" loading="lazy"/>
        <div class="card-body">
          <h3 class="title">${p.nom}</h3>
          <div class="meta">${p.type.toUpperCase()} • ${p.collection}</div>
          <div class="tags">
            ${(p.couleurs||[]).slice(0,4).map(c=>`<span class='tag'>${c}</span>`).join('')}
          </div>
        </div>`;
      grid.appendChild(card);
    }
  }

  function applyFilters(){
    const term = (q.value||'').toLowerCase();
    const t = type.value;
    const col = collection.value;
    const list = products.filter(p=>{
      const matchesQ = !term || [p.nom,p.collection,(p.couleurs||[]).join(' ')].join(' ').toLowerCase().includes(term);
      const matchesT = !t || p.type === t;
      const matchesC = !col || p.collection === col;
      return matchesQ && matchesT && matchesC;
    });
    render(list);
  }

  q?.addEventListener('input', applyFilters);
  type?.addEventListener('change', applyFilters);
  collection?.addEventListener('change', applyFilters);

  render(products);
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', loadCatalogue);
}else{ loadCatalogue(); }
