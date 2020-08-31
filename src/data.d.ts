import { DataProvider } from './services/data'

declare module 'vue/types/vue' {
    interface Vue {
        $dataService: DataProvider
    }
}
