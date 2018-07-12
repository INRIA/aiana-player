function getProps(config) {
  const props = [];

  if (config.ref) props.push('svgRef');
  if (config.titleProp) props.push('title');
  if (config.expandProps) props.push('...props');

  if (props.length === 0) return '()';
  if (props.length === 1 && config.expandProps) return 'props';

  return `({ ${props.join(', ')} })`;
}

module.exports = (code, config, state) => {
  const props = getProps(config);

  let result = `import * as React from 'react';\n\n`;
  result += `const ${state.componentName}: React.SFC = ${props} => ${code}\n\n`;
  result += `export default ${state.componentName}`;

  return result;
};
