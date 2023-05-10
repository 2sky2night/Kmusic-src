import { useRoute } from 'vue-router'
const useRouteInfor = () => {
    const $route = useRoute()
    return {
        params: $route.params,
        query: $route.query,
        $route
    }
}

export default useRouteInfor