import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

import { performAction } from './js/formHandler'
import { removeTrip } from './js/formHandler'
import { validCITY } from './js/cityChecker'

export {
    performAction,
    removeTrip,
    validCITY
}
