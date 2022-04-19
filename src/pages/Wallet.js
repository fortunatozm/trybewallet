import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionsCurrency } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { currencyD } = this.props;
    currencyD();
  }

  render() {
    const { email, currencyM } = this.props;
    console.log('Nova', currencyM);
    return (
      <div>
        TrybeWallet
        <header>
          <span data-testid="email-field">
            { email }
          </span>
          <span data-testid="total-field">
            0
          </span>
          <span data-testid="header-currency-field">
            { currencyM[0] }
            {/* BRL */}
          </span>
        </header>
      </div>);
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  // wallet: PropTypes.number.isRequired,
  // currency: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currencyD: () => dispatch(actionsCurrency()),
});

const mapStateToProps = (state) => (
  {
    email: state.user.email,
    wallet: state.wallet.expenses,
    currencyM: state.wallet.currencies,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
