import React from 'react';
import Proptypes, { shape } from 'prop-types';

class Table extends React.Component {
  render() {
    const { wallet, butClick } = this.props;
    return (
      <section>
        <table>
          {/* <thead> */}
          <tr>
            <th>
              Descrição
            </th>
            <th>
              Tag
            </th>
            <th>
              Método de pagamento
            </th>
            <th>
              Valor
            </th>
            <th>
              Moeda
            </th>
            <th>
              Câmbio utilizado
            </th>
            <th>
              Valor convertido
            </th>
            <th>
              Moeda de conversão
            </th>
            <th>
              Editar/Excluir
            </th>
          </tr>
          {/* </thead> */}
          { wallet.length === 0 || wallet === undefined ? undefined : (
            wallet.map((addData) => (
              <tr key={ addData.id }>
                <td>
                  { addData.id }
                </td>
                <td>
                  { addData.description }
                </td>
                <td>
                  { addData.tag }
                </td>
                <td>
                  { addData.method }
                </td>
                <td>
                  { (parseFloat(addData.value)).toFixed(2) }
                </td>
                <td>
                  { (addData.exchangeRates[addData.currency].name).split('/')[0] }
                </td>
                <td>
                  { parseFloat(addData.exchangeRates[addData.currency].ask).toFixed(2) }
                </td>
                <td>
                  { (parseFloat(addData.value)
              * parseFloat((addData.exchangeRates[addData.currency].ask))).toFixed(2) }
                </td>
                <td>
                  Real
                </td>
                <td>
                  <button type="button">Editar</button>
                  <button
                    onClick={ butClick }
                    id={ addData.id }
                    type="button"
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))) }
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  wallet: Proptypes.arrayOf(shape()).isRequired,
  butClick: Proptypes.func.isRequired,
};

export default Table;
