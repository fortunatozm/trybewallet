import React from 'react';
import Proptypes, { shape } from 'prop-types';

class Table extends React.Component {
  render() {
    const { wallet } = this.props;
    return (
      <section>
        <table>
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
          { wallet.map((addData) => (
            <tr key={ addData.id }>
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
                <button type="button">Excluir</button>
              </td>
            </tr>
          )) }
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  wallet: Proptypes.arrayOf(shape()).isRequired,
};

export default Table;
