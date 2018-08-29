import { injectGlobal } from 'styled-components';

export function injectGlobalStyles() {
  injectGlobal`
    @font-face {
      font-family: system;
      src: local('system-ui'), local('.SFNSText-Light'), local('Segoe UI'),
        local('Roboto'), local('Oxygen-Sans'), local('Ubuntu'), local('Cantarell'),
        local('Helvetica Neue');
    }

    .js-focus-visible :focus:not(.focus-visible) {
      outline: none;
    }

    .js-focus-visible .focus-visible {
      box-shadow: inset 0 0 0 2px #3B70BD;
      outline: none;
    }
  `;
}
