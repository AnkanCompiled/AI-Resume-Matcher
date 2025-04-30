import NavigationComponent from "./components/NavigationComponent";
import { AuthProvider } from "./contexts/AuthContext";
import IndexRoute from "./router/IndexRoute";

export default function App() {
  return (
    <AuthProvider >
      <NavigationComponent />
      <IndexRoute />
    </AuthProvider>
  )
}