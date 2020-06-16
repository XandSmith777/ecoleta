function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]');

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => res.json()) //transforma os itens encontrados no endereço acima em json
    .then((states) => {
      for (const state of states) {
        //cria um elemento html com os dados selecionado do objeto convertido em json
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]');
  const stateInput = document.querySelector('input[name=state]');

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = '<option value="">Selecione a Cidade</option>';
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        //preenche o combobox de cidade com as cidades relacionadas com seu respectivo estado
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

document.querySelector('select[name=uf]').addEventListener('change', getCities);

//Items de coleta
//função que pega todos os li

const itemsToCollect = document.querySelectorAll('.items-grid li');

for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('input[name="items"]');

//variável que armazena os items selecionado dos cards
let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  //adiciona ou remove uma classe para um elemento html pelo javascript usando a função toggle
  itemLi.classList.toggle('selected');

  const itemId = itemLi.dataset.id;

  //verifica se existem items selecionados
  // pega os items selecionados
  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId; //isso será true ou false
    return itemFound;
  });

  //se o item já estiver selecionado
  if (alreadySelected >= 0) {
    //tira da seleção
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });

    selectedItems = filteredItems;
  } else {
    //se não estiver selecionado adiciona à seleção
    selectedItems.push(itemId);
  }

  //faz atualização do campo escondido com os dados selecionados
  collectedItems.value = selectedItems;
}
