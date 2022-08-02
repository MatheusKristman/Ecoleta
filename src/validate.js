export default function validate(data, elements) {
  const error = {};
  const numberTest = /^[0-9]+$/;

  if (data.name.length <= 2) {
    error.name = 'Nome invalido!';
  }

  if (data.address.length <= 4) {
    error.address = 'Endereço invalido!';
  }

  if (!numberTest.test(data.number)) {
    error.number = 'Número invalido!';
  }

  if (data.city.length <= 2) {
    error.city = 'Cidade invalida! Insira a cidade sem abreviar.';
  }

  if (data.state.length <= 2) {
    error.state = 'Estado invalido! Insira o estado sem abreviar.';
  }

  if (data.categ.length === 0) {
    error.categ = 'Favor selecionar categoria!';
  }  

  return error;
}
