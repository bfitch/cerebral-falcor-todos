import {set} from 'cerebral-addons';
import falcorCallSignal from '../../signals/call';

export function callFactory(path, args){
  return [
    set(`output:/falcor.path`,path),
    set(`output:/falcor.args`,args),
    falcorCallSignal
  ]
}