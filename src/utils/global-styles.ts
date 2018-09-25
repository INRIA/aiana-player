import { injectGlobal } from './styled-components';

export function injectGlobalStyles() {
  injectGlobal([
    `
    @font-face {
      font-family: system;
      src: local('system-ui'), local('.SFNSText-Light'), local('Segoe UI'),
        local('Roboto'), local('Oxygen-Sans'), local('Ubuntu'), local('Cantarell'),
        local('Helvetica Neue');
    }
  `
  ] as any);
}
