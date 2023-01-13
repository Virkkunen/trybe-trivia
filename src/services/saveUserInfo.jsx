import { connect } from 'react-redux';



const mapStateToProps = (state) => ({
  ...state.user,
});

export default connect(mapStateToProps)(saveUserInfo);
