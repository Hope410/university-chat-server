import 'dotenv/config'

import AppDataSource from './data-source'
import main from './main'

AppDataSource.initialize()
  .then(main)
  .catch((error) => console.error(error))
