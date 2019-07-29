const prodConfig = {
  api: "http://api.resaleglobal.com"
}

const stagingConfig = {
  api: "http://api.staging.resaleglobal.com"
}

const localConfig = {
  api: "http://localhost:8000"
}

let usedConfig

if (process.env.REACT_APP_ENVIRONMENT === 'production') {
  usedConfig = prodConfig
} else if (process.env.REACT_APP_ENVIRONMENT === 'staging') {
  usedConfig = stagingConfig
} else {
  usedConfig = localConfig
}

export default usedConfig