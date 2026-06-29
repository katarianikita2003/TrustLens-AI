import {
    Routes,
    Route,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import InvestigationPage from "./pages/InvestigationPage";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<DashboardPage />}
            />

            <Route
                path="/investigation/:id"
                element={<InvestigationPage />}
            />

        </Routes>

    );

}

export default App;