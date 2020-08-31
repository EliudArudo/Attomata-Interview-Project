import { Vue as _Vue } from 'vue-property-decorator'
import DataProvider from '../services/data'

export function DataProviderPlugin(Vue: typeof _Vue, options?: any) {
    Vue.prototype.$dataService = DataProvider
}