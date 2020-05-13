const path = require("path")
const fs = require("fs")

if (process.argv.length !== 3) {
  throw new Error("Usage: node  create-component.js  ComponentName")
}

const componentName = process.argv[2]
const componentPath = path.join(`src/components/${componentName}`)

if (fs.existsSync(componentPath)) {
  throw new Error("Component already exists.")
}

const getIndexContent = (newComponentName) => `import ${newComponentName} from "./${newComponentName}"

export default ${newComponentName}
`

const getComponentContent = (newComponentName) => `import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import styled from "styled-components"

const ${newComponentName} = (props) => {
  const { className } = props

  return (
    <div className={classNames(\`${newComponentName}\`, className)}>
    
    </div>
  )
}

${newComponentName}.propTypes = {
  className: PropTypes.string,
}

${newComponentName}.defaultProps = {
  className: \`\`,
}

export default ${newComponentName}
`

fs.mkdir(componentPath, (err) => {
  if (err) throw err

  fs.writeFileSync(path.join(componentPath, `${componentName}.js`), getComponentContent(componentName))
  fs.writeFileSync(path.join(componentPath, `index.js`), getIndexContent(componentName))
  console.log(`Component ${componentName} created.`)
})
