import _ from 'lodash';
import fp from 'lodash/fp';
import { Component } from 'preact';
import PropTypes from 'prop-types';

// Locals
import withContext from './withContext';

const navBarList = require('app/data/nav_bar_list.json');

function buildNavConfigs(navList) {
  const singleNavs = [];
  const navWithSubs = {};

  _.each(navList, nav => {
    if (!_.isEmpty(nav.path) && _.isEmpty(nav.parent)) {
      singleNavs.push(nav);
      return;
    }

    if (_.isEmpty(nav.path)) {
      navWithSubs[nav.key] = { ...nav, subNavs: [] };
      return;
    }

    if (!_.isEmpty(nav.parent)) {
      navWithSubs[nav.parent].subNavs.push(nav);
    }
  });

  return [...singleNavs, ..._.values(navWithSubs)];
}

class NavBar extends Component {
  static propTypes = {
    currentPath: PropTypes.string,
    user: PropTypes.object,
  };

  static defaultProps = {
    currentPath: '/',
  };

  renderNavMenu = () => {
    if (this.props.user == null) return null;

    const navItems = fp.flow(
      fp.reject({ disabled: true }),
      fp.map(this.renderNavItem)
    )(buildNavConfigs(navBarList));

    return <ul className="navbar-nav mr-auto">{navItems}</ul>;
  };

  renderNavItem = ({ label, key, path, subNavs }) => {
    const { currentPath } = this.props;

    if (path == null && _.isEmpty(subNavs)) return null;

    // Single navs
    if (_.isEmpty(subNavs)) {
      return (
        <li className={`${path === currentPath ? 'active' : ''} nav-item`}>
          <a className="nav-link" href={path}>
            {label}
          </a>
        </li>
      );
    }

    const isActive = fp.flow(
      fp.map('path'),
      fp.includes(currentPath)
    )(subNavs);

    return (
      <li className={`${isActive ? 'active' : ''} nav-item dropdown`}>
        <a
          aria-expanded="false"
          aria-haspopup="true"
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          id={`nav-bar-dropdown-${key}`}
          role="button"
        >
          {label}
        </a>
        <div aria-labelledby={`nav-bar-dropdown-${key}`} className="dropdown-menu">
          {_.map(subNavs, nav => (
            <a className={`${nav.path === currentPath ? 'active' : ''} dropdown-item`} href={nav.path}>
              {nav.label}
            </a>
          ))}
        </div>
      </li>
    );
  };

  renderTitle = () => {
    const { user } = this.props;
    if (user == null) return <h5 className="font-weight-bold mb-0 text-uppercase text-white">{'Công cụ VitaFit'}</h5>;

    // const { avatar, name } = user;

    // return (
    //   <div className="align-items-center d-flex justify-content-end">
    //     <h6 className="mb-0 text-white">{name}</h6>
    //     <img alt={`${name}'s avatar`} className="ml-2 rounded-circle" height={40} src={avatar} width={40} />
    //   </div>
    // );
    return <div></div>;
  };

  render() {
    return (
      <nav className="bg-dark mb-3 navbar navbar-dark navbar-expand">
        <div className="container">
          <a className="navbar-brand" href="https://vitafit.vn">
            <img height={50} src="/images/logo.png" />
          </a>
          {this.renderNavMenu()}
          {this.renderTitle()}
        </div>
      </nav>
    );
  }
}

export default withContext(NavBar);
