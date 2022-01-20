import AdminDash from './pages/dashboard/adminDash.js';
import UserDash from './pages/dashboard/userDash.js';
if (!FLASK_SESSION.loggedin) window.location = '/login';
document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render( /*#__PURE__*/React.createElement(Dash, null), document.getElementById('root'));
});

const Dash = () => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, FLASK_SESSION.admin ? /*#__PURE__*/React.createElement(AdminDash, null) : /*#__PURE__*/React.createElement(UserDash, null));
};
//# sourceMappingURL=dashboard.js.map